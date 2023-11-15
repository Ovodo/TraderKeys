// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import clientPromise from "@/lib/mongodb";

async function init(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("TraderKeys");
    const allusers = await db.collection("users").find({}).toArray();
    console.log("users", allusers);

    return Response.json(allusers, { status: 200 });
  } catch (error) {
    console.error("getUsers Error:", error);

    return Response.json(
      { message: "An error occured while fetching users" },
      { status: 500 }
    );
  }
}

export { init as GET };
