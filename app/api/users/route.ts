// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { newUser } from "@/lib/actions";
import clientPromise from "@/lib/mongodb";
import { Key } from "@/model/user";
import { AptosAccount, HexString } from "aptos";

async function init(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("TraderKeys");
    const allusers = await db.collection("users").find({}).toArray();
    console.log("users", allusers);

    return Response.json(allusers);
  } catch (error) {
    console.error("getUsers Error:", error);

    return Response.json(
      { message: "An error occured while fetching users" },
      { status: 500 }
    );
  }
}

export { init as GET };