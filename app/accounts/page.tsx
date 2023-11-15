import React from "react";
import { User } from "next-auth";
import { baseUrl } from "@/config";
import Accounts from "@/components/Accounts";

const getUsers = async () => {
  const res = await fetch(`${baseUrl}/api/users`);
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  return data;
};

const Page = async () => {
  const users: User[] = await getUsers();

  console.log("users", users);

  return <Accounts data={users} />;
};

export default Page;
