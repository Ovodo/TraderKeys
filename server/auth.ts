import { AptosAccount, HexString } from "aptos";
import { NextAuthOptions, getServerSession } from "next-auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";

import TwitterProvider, { TwitterProfile } from "next-auth/providers/twitter";
import { fundAccount } from "@/lib/contract";

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_ID as string,
      clientSecret: process.env.TWITTER_SECRET as string,
      version: "2.0",
      profile(profile: TwitterProfile) {
        const wallet = new AptosAccount();
        const privateKey = wallet.toPrivateKeyObject().privateKeyHex;

        return {
          id: profile.data.id,
          name: profile.data.name ?? "",
          address: wallet.address(),
          image: profile.data.profile_image_url ?? "",
          created_at: new Date(),
          privateKey,
          is_banned: false,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      console.log("usser", user);

      return {
        ...session,
        user: {
          id: user.id,
          name: user.name,
          address: user.address,
          image: user.image,
          created_at: user.created_at,
          privateKey: user.privateKey,
          is_banned: user.is_banned,
        },
      };
    },
  },
  events: {
    async signIn({ user, account }) {
      const aptosAccount = new AptosAccount(
        new HexString(user.privateKey).toUint8Array()
      );
      await fundAccount(aptosAccount);

      console.log("funded");
    },
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
