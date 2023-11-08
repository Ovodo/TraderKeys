import {
  scrypt,
  randomFill,
  createCipheriv,
  scryptSync,
  createDecipheriv,
} from "node:crypto";
import { Buffer } from "node:buffer";
import crypto from "crypto";

const algorithm = "aes-256-cbc";
// generate 16 bytes of random data
const initVector = crypto.randomBytes(16);
// protected data
const message = "This is a secret message";
// secret key generate 32 bytes of random data
const Securitykey = crypto.randomBytes(32);
const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);
const decipher = crypto.createDecipheriv(algorithm, Securitykey, initVector);

export const encrypt = (privateKey: string) => {
  let encryptedData = cipher.update(privateKey, "utf8", "hex");
  encryptedData += cipher.final("hex");
  return encryptedData;
};

export const decrypt = (encryptedData: string) => {
  let decryptedData = decipher.update(encryptedData, "hex", "utf8");

  decryptedData += decipher.final("utf8");
  return decryptedData;
};

const algo = "aes-192-cbc";
const password = "Jam";

export const encrypts = async (priv: string) => {
  // First, we'll generate the key. The key length is dependent on the algo.
  // In this case for aes192, it is 24 bytes (192 bits).
  let encrypted = "kols";
  scrypt(password, "salt", 24, (err, key) => {
    if (err) throw err;
    // Then, we'll generate a random initialization vector
    randomFill(new Uint8Array(16), (err, iv) => {
      if (err) throw err;

      const cipher = createCipheriv(algo, key, iv);

      encrypted = cipher.update(priv, "utf8", "hex");
      encrypted += cipher.final("hex");
      //   console.log("enc", encrypted);
    });
  });
  return encrypted;
};

export const decrypts = (priv: string) => {
  let decrypted = "";
  // Use the async `crypto.scrypt()` instead.
  scrypt(password, "salt", 24, (err, key) => {
    if (err) throw err;
    // The IV is usually passed along with the ciphertext.
    const iv = Buffer.alloc(16, 0); // Initialization vector.

    const decipher = createDecipheriv(algo, key, iv);

    // Encrypted using same algorithm, key and iv.
    decrypted = decipher.update(priv, "hex", "utf8");
    decrypted += decipher.final("utf8");
  });

  return decrypted;
};
