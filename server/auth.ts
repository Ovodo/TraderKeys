import { AptosAccount, HexString } from "aptos";
import { NextAuthOptions, getServerSession } from "next-auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";

import TwitterProvider, { TwitterProfile } from "next-auth/providers/twitter";
import {
  fundAccount,
  getAccountt,
  getAptosBalance,
  initializeAccount,
} from "@/lib/contract";
import { hashPrivateKey } from "@/lib/actions";
import { encrypt } from "@/lib/security";

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_ID as string,
      clientSecret: process.env.TWITTER_SECRET as string,
      version: "2.0",
      async profile(profile: TwitterProfile) {
        const wallet = new AptosAccount();
        const privateKey = wallet.toPrivateKeyObject().privateKeyHex;
        const hash = await encrypt(privateKey);
        await initializeAccount(wallet);

        return {
          id: profile.data.id,
          name: profile.data.name ?? "",
          username: profile.data.username,
          address: wallet.toPrivateKeyObject().address as string,
          image: profile.data.profile_image_url ?? "",
          created_at: new Date(),
          privateKey: hash,
          password: "",
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      return {
        ...session,
        user: {
          id: user.id,
          name: user.name,
          username: user.username,
          address: user.address,
          image: user.image,
          created_at: user.created_at,
          privateKey: user.privateKey,
          password: user.password,
        },
      };
    },
  },
  // events: {
  //   async signIn({ user, account }) {
  //     const aptosAccount = new AptosAccount(undefined, user.address);
  //     await initializeAccount(aptosAccount);
  //   },
  // },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
