import { AptosAccount } from "aptos";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { authOptions } from "../server/auth";

export async function getSession() {
  return await getServerSession(authOptions);
}

export const logout = async () => {
  "use server";

  cookies().delete("user");
};
