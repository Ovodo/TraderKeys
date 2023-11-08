import { AptosAccount, HexString } from "aptos";
import crypto from "crypto";
import { User } from "next-auth";
import { User as NewUser } from "./types";
import { decrypt } from "./security";

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
  const pub = wallet.toPrivateKeyObject().publicKeyHex;
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
