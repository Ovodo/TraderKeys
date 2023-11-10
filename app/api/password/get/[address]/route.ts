// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { newUser } from "@/lib/actions";
import clientPromise from "@/lib/mongodb";
import { decrypt, encrypt } from "@/lib/security";
import { Key } from "@/model/user";
import { AptosAccount, HexString } from "aptos";
import { User } from "next-auth";

async function init(
  request: Request,
  { params }: { params: { address: string } }
) {
  const address = params.address;

  try {
    const client = await clientPromise;
    const db = client.db("TraderKeys");
    const user = (await db
      .collection("users")
      .findOne({ address: address })) as unknown as User;
    if (!user) {
      return Response.json({ message: "No User found" }, { status: 400 });
    } else {
      const hash = await decrypt(user.password);
      return Response.json(hash);
    }
  } catch (error) {
    console.error("Password Error:", error);

    return Response.json(
      { message: "An error occured while fetching password" },
      { status: 500 }
    );
  }
}

export { init as GET };
