// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getBuyPrice, getKeySupply } from "@/lib/contract";
import clientPromise from "@/lib/mongodb";
import { PrivateKey } from "@/lib/types";

async function init(
  request: Request,
  { params }: { params: { name: string } }
) {
  const author = params.name;

  try {
    const client = await clientPromise;
    const db = client.db("TraderKeys");
    const singleKey = (await db
      .collection("keys")
      .findOne({ name: `@${author}` })) as unknown as PrivateKey;
    const supply = await getKeySupply(singleKey.address);
    const price = await getBuyPrice(singleKey.address, 1);

    return Response.json({ ...singleKey, supply, price });
  } catch (error) {
    console.error("GetKey Error:", error);

    return Response.json(
      { message: "An error occured while fetching key" },
      { status: 500 }
    );
  }
}

export { init as GET };
