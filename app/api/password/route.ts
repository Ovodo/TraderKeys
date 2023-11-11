// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import clientPromise from "@/lib/mongodb";
import { encrypt } from "@/lib/security";
import { User } from "next-auth";

type Password = {
  password: string;
  user: User;
};

async function init(request: Request) {
  const body: Password = await request.json();
  const hash = await encrypt(body.password);

  console.log(hash);

  try {
    const client = await clientPromise;
    const db = client.db("TraderKeys");
    const user = await db
      .collection("users")
      .findOne({ address: body.user.address });
    if (!user) {
      return Response.json({ message: "No User found" }, { status: 400 });
    } else {
      await db
        .collection("users")
        .updateOne(
          { address: body.user.address },
          { $set: { password: hash } }
        );
      return Response.json({ message: "Password updated Successfully" });
    }
  } catch (error) {
    console.error("Update Password Error:", error);

    return Response.json(
      { message: "An error updating Password" },
      { status: 500 }
    );
  }
}

export { init as POST };
