import { AptosAccount, HexString } from "aptos";
import { User } from "next-auth";
import { User as NewUser } from "./types";
import { decrypt } from "./security";
import axios from "axios";

export const newUser = async (user: User): Promise<NewUser> => {
  const private_key = await decrypt(user.privateKey);
  const wallet = new AptosAccount(
    new HexString(private_key as string).toUint8Array(),
    user.address
  );
  const key = wallet.toPrivateKeyObject().privateKeyHex;
  const pub = wallet.toPrivateKeyObject().address;

  const newUserObject = {
    name: user.name,
    username: user.username,
    privateKey: key as string,
    publicKey: pub as string,
  };
  return newUserObject;
};

export const getPrices = async (item: string[]) => {
  const encodedSymbols = encodeURIComponent(JSON.stringify(item));

  const options = {
    method: "GET",
    url: `https://data-api.binance.vision/api/v3/ticker/price?symbols=${encodedSymbols}`,
    headers: {
      "X-MBX-APIKEY": process.env.BINANCE_API,
    },
  };

  try {
    const response = await axios.request(options);
    const price = response.data;

    return price;
  } catch (error) {
    console.error(error);
  }
};
