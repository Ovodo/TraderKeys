import React from "react";
import { User } from "next-auth";
import { baseUrl } from "@/config";
import Accounts from "@/components/Accounts";
import axios from "axios";

const getUsers = async () => {
  const res = await fetch(`${baseUrl}/api/users`);
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  return data;
};
const getUser = async () => {
  const res = await axios.get(`${baseUrl}/api/users`);
  if (res.statusText !== "OK") {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  const data = res.data;
  return data;
};

const Page = async () => {
  const users: User[] = await getUsers();
  const use = await getUser();

  console.log("use", use);

  return <Accounts data={use} />;
};

export default Page;
