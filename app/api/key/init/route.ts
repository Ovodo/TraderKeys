// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { newUser } from "@/lib/actions";
import { buyKeys, getKeyHolders } from "@/lib/contract";
import clientPromise from "@/lib/mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { Key } from "@/model/user";
import { AptosAccount, HexString } from "aptos";
import { User } from "next-auth";

async function init(request: Request) {
  const body: { name: string; user: User } = await request.json();
  const { name, user } = body;
  const formattedUser = await newUser(user);
  const keySubjectAddress = new AptosAccount(
    new HexString(formattedUser.privateKey).toUint8Array()
  ).toPrivateKeyObject().address as string;
  const data = new Key({
    address: keySubjectAddress,
    name,
    owner: user.name,
  });

  try {
    const client = await clientPromise;
    const db = client.db("TraderKeys");
    const initUser = await db
      .collection("users")
      .findOne({ address: user.address });
    const existingKey = await db.collection("keys").findOne({ name: name });
    console.log(existingKey);
    console.log("key sub", keySubjectAddress);
    // return;

    // check if key exist already and has been initialized, if not buy 1 key to initialize
    // and store in the db
    const KeyHolders = await getKeyHolders(keySubjectAddress);
    if (KeyHolders.length !== 0) {
      console.error({
        message: "Key has already been initialized",
      });
      return Response.json(
        {
          message: "Key has already been initialized",
        },
        { status: 500 }
      );
    } else {
      await buyKeys(formattedUser, user.address, 1);
      await db.collection("keys").insertOne(data);
      await db
        .collection("users")
        .updateOne({ address: user.address }, { $set: { key: name } });
    }
  } catch (error) {
    console.error("Init Error:", error);

    return Response.json(
      { message: "An error occured while initializing " },
      { status: 500 }
    );
  }

  return Response.json({ message: "Key Initialized Successfully" });
}

export { init as POST };
