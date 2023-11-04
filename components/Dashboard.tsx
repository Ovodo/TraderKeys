"use client";

import { User } from "@/lib/types";
import { Session } from "next-auth";
import React from "react";
import Copy from "./utils/Copy";

const Dashboard = ({ session }: { session: Session }) => {
  return (
    <div className='w-[25%] bg-appBlue h-screen'>
      <div className='flex'>
        <p className='text-white truncate'>{session.user.address.toString()}</p>
        <Copy content={session.user.address.hexString} />
      </div>
      <div> 0.05 Apt</div>
    </div>
  );
};

export default Dashboard;
