import crypto from "node:crypto";

// Convert an arbitrary string to a key subject address using SHA-256 hash
function stringToKeySubjectAddress(inputString: string) {
  const sha256 = crypto.createHash("sha256");
  sha256.update(inputString);
  const hash = sha256.digest("hex");
  // Assuming the hash is a valid Ethereum/Aptos address
  return `0x${hash}`;
}

// Reverse the process to get the original input string
function keySubjectAddressToString(keySubjectAddress: string) {
  // Remove the '0x' prefix
  const hash = keySubjectAddress.slice(2);
  // Convert the hash back to the original string
  return Buffer.from(hash, "hex").toString();
}

// Example usage
const inputString = "MyKeySubject";
const keySubjectAddress = stringToKeySubjectAddress(inputString);
console.log("Key Subject Address:", keySubjectAddress);

const originalString = keySubjectAddressToString(keySubjectAddress);
console.log("Original String:", originalString);
