import { HexString, MaybeHexString } from "aptos";
import { DefaultUser } from "next-auth";

export type { Session } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: User;
  }

  type Address = {
    hexString: HexString;
  };

  interface User extends Omit<DefaultUser, "id"> {
    id: sting;
    name: string;
    username: string;
    username: string;
    image: string;
    key?: string;
    address: string;
    key?: string;
    address: string;
    privateKey: string;
    created_at: Date;
    password: string;
  }
}
