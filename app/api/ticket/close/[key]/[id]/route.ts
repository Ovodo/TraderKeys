// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getPrices } from "@/lib/actions";
import clientPromise from "@/lib/mongodb";
import { Ticket } from "@/lib/types";
import { ObjectId } from "mongodb";

type Price = { symbol: string; price: string };

async function init(
  request: Request,
  { params }: { params: { key: string; id: string } }
) {
  const author = params.key;
  const id = params.id;

  try {
    const client = await clientPromise;
    const db = client.db("TraderKeys");
    const ticket = (await db
      .collection("ticket")
      .findOne({ author, _id: new ObjectId(id) })) as Ticket;
    const close = ((await getPrices([ticket.asset]))[0] as Price).price;
    const pnl =
      ((parseFloat(close) - parseFloat(ticket.open as string)) /
        parseFloat(ticket.open as string)) *
      100;

    await db
      .collection("ticket")
      .updateOne(
        { author, _id: new ObjectId(id) },
        { $set: { closed: true, close, pnl } }
      );

    return Response.json({ message: "Ticket closed" });
  } catch (error) {
    console.error("GetTicket Error:", error);

    return Response.json(
      { message: "An error occured while closig tickets" },
      { status: 500 }
    );
  }
}

export { init as GET };
