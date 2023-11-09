"use server";

import { baseUrl } from "@/config";
import { scrypt, createCipheriv, createDecipheriv, scryptSync } from "crypto";

const password = "YourSecretPassword"; // Replace with your secret passphrase
const salt = "YourSaltValue"; // Replace with a unique salt

// Generate key and IV
const key = scryptSync(password, salt, 24); // You can use scryptSync for simplicity
const iv = Buffer.alloc(16, 0); // Initialization vector.

export const encrypt = async (priv: string) => {
  const algo = "aes-192-cbc";
  const cipher = createCipheriv(algo, key, iv);

  let encrypted = cipher.update(priv, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
};

export const decrypt = async (encryptedData: string) => {
  const algo = "aes-192-cbc";
  const decipher = createDecipheriv(algo, key, iv);

  try {
    let decrypted = decipher.update(encryptedData, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  } catch (error) {
    console.error("Decryption error:", error);
    return null; // Handle decryption errors as needed
  }
};

export const closeTicket = async (item: string, id: string) => {
  console.log("Fetching");

  const res = await fetch(`${baseUrl}/api/ticket/close/${item}/${id}`);
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    console.log(res);

    throw new Error("Failed to fetch data");
  }
  const data = res.json();
  return data;
};
