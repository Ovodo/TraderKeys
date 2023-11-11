// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import clientPromise from "@/lib/mongodb";
import { NextRequest } from "next/server";

async function init(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("TraderKeys");
    const keys = await db.collection("keys").find({}).toArray();

    return Response.json(keys);
  } catch (error) {
    console.error("getUsers Error:", error);

    return Response.json(
      { message: "An error occured while fetching users" },
      { status: 500 }
    );
  }
}

export { init as GET };
