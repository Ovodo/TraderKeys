import { AptosAccount, HexString } from "aptos";
import crypto from "crypto";
import { User } from "next-auth";
import { User as NewUser } from "./types";
import { decrypt } from "./security";
import axios from "axios";
import { baseUrl } from "@/config";
// import { Spot } from "@binance/connector";

// const apiKey = process.env.BINANCE_KEY;
// const apiSecret = process.env.SIGNATURE;
// const client = new Spot(apiKey, apiSecret);

// Convert an arbitrary string to a key subject address using SHA-256 hash
export function stringToKeySubjectAddress(inputString: string) {
  const sha256 = crypto.createHash("sha256");
  sha256.update(inputString);
  const hash = sha256.digest("hex");
  const has = `0x1${hash.slice(0, 61)}`;

  // Assuming the hash is a valid Ethereum/Aptos address
  return `${has}`;
}

// Generate a hash of the private key
export function hashPrivateKey(privateKey: string) {
  const hash = crypto.createHash("sha256").update(privateKey).digest("hex");
  return hash;
}

export const getPrivateKey = (address: string): string => {
  const wallet = new AptosAccount(undefined, address);
  return wallet.toPrivateKeyObject().privateKeyHex;
};

export const newUser = async (user: User): Promise<NewUser> => {
  const private_key = await decrypt(user.privateKey);
  const wallet = new AptosAccount(
    new HexString(private_key as string).toUint8Array(),
    user.address
  );
  const key = wallet.toPrivateKeyObject().privateKeyHex;
  const pub = wallet.toPrivateKeyObject().address;
  // console.log("_key", private_key);
  // console.log("_key2", key);

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
