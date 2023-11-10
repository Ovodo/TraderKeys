// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getPrices } from "@/lib/actions";
import clientPromise from "@/lib/mongodb";
import { Ticket } from "@/lib/types";

type Price = { symbol: string; price: string };

async function init(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("TraderKeys");
    const tickets = (await db
      .collection("ticket")
      .find()
      .toArray()) as Ticket[];

    // const symbols = tickets.map((item) => item.asset);
    const symbols: string[] = [];
    const uniqueSymbols: any = {};

    tickets.forEach((item) => {
      const asset = item.asset;
      if (!uniqueSymbols[asset]) {
        uniqueSymbols[asset] = true;
        symbols.push(asset);
      }
    });

    const prices: Price[] = await getPrices(symbols);
    const updatedTickets = tickets.map((item) => {
      const close = prices.find((asset) => asset.symbol === item.asset)
        ?.price as string;
      const pnl = item.pnl
        ? item.pnl
        : ((parseFloat(close) - parseFloat(item.open as string)) /
            parseFloat(item.open as string)) *
          100;
      return { ...item, close, pnl };
    });
    return Response.json(updatedTickets);
  } catch (error) {
    console.error("GetTicket Error:", error);

    return Response.json(
      { message: "An error occured while fetching tickets" },
      { status: 500 }
    );
  }
}

export { init as GET };
