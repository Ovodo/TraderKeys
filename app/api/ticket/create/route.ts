// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import clientPromise from "@/lib/mongodb";
import { Ticket } from "@/lib/types";

async function create(request: Request) {
  const body: Ticket = await request.json();

  try {
    const client = await clientPromise;
    const db = client.db("TraderKeys");
    const existingAsset = (await db
      .collection("ticket")
      .findOne({ asset: body.asset })) as Ticket;
    if (existingAsset && !existingAsset.close) {
      return Response.json(
        { message: "Asset is already open for this key📜" },
        { status: 400 }
      );
    }
    await db.collection("ticket").insertOne(body);
    console.log("Ticket added to ", body);

    return Response.json({ message: "Ticket created Successfully" });
  } catch (error) {
    console.error("Error Creating Ticket:", error);

    return Response.json(
      { message: "An error while creating Ticket📜" },
      { status: 500 }
    );
  }
}

export { create as POST };
