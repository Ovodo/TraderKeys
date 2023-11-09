import AddButton from "@/components/button/AddButton";
import Image from "next/image";
import React from "react";
import { Session, User, getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";
import Copy from "@/components/utils/Copy";
import BuyButton from "@/components/button/BuyButton";
import SearchComponent from "@/components/input/SearchComponent";
import { baseUrl } from "@/config";
import { getBuyPrice } from "@/lib/contract";
import Accounts from "@/components/Accounts";

const getUsers = async () => {
  const res = await fetch(`${baseUrl}/api/users`);
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  const data = res.json();
  return data;
};

const Page = async () => {
  const session = (await getServerSession(authOptions)) as Session;
  const users: User[] = await getUsers();

  return <Accounts data={users} />;
};

export default Page;
