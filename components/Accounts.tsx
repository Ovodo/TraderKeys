"use client";
import { getBuyPrice } from "@/lib/contract";
import { User } from "next-auth";
import React, { memo, useState } from "react";
import SearchComponent from "./input/SearchComponent";
import { useAppSelector } from "@/redux/hooks";
import Link from "next/link";
const itemStyle = "text-lg text-slate-900 text-center border-r border-black";

const Accounts = ({ data }: { data: User[] }) => {
  // let users: User[] = JSON.parse(data);
  const { text } = useAppSelector((state) => state.Search);
  const users = data.filter(
    (item) =>
      (item.key as string).toLowerCase().includes(text.toLowerCase()) ||
      item.name.toLowerCase().includes(text.toLowerCase())
  );
  console.log(users);

  return (
    <main className='flex min-h-screen relative bg-gradient-to-t from-appRed to-appYellow flex-col items-center justify-start p-10'>
      <section
        id='TOP'
        className='flex  border-b border-appBlue justify-end w-full'
      >
        <SearchComponent />
      </section>
      <section className='h-[66vh] mt-5 bg-appCream w-[75%]  border-2 border-appOrange border-opacity-10'>
        <h4 className='text-3xl cursor-pointer w-full text-center text-appBlue font-semibold'>
          Accounts
        </h4>
        <div className=' w-full border-double border-y border-opacity-50 border-slate-900 grid grid-cols-[0.3fr,1.5fr,1.5fr,1fr]'>
          <p className={itemStyle}>SN</p>
          <p className={itemStyle}>ACCOUNT</p>
          <p className={itemStyle}>KEY</p>
          <p className='text-lg text-slate-900 text-center'>PRICE</p>
        </div>
        {users.map((user, index) => {
          const price = getBuyPrice(user.address, 1);
          return (
            <div
              key={user.address}
              className=' w-full border-double border- border-opacity-50 border-slate-900 grid grid-cols-[0.3fr,1.5fr,1.5fr,1fr]'
            >
              <p className={itemStyle}>{index + 1}</p>
              <Link href={`/`}>
                <p className={itemStyle}>{user.name ?? "__"}</p>
              </Link>
              <Link href={`/keys/${user.key?.slice(1, user.key.length)}`}>
                <p className={`${itemStyle}`}>{user.key}</p>
              </Link>
              <p className='text-lg text-slate-900 text-center'>{price}</p>
            </div>
          );
        })}

        {/* <div className=' w-full border-double border- border-opacity-50 border-slate-900 grid grid-cols-[0.3fr,1.5fr,1.5fr,1fr,1fr]'>
          <p className={itemStyle}>02</p>
          <p className={itemStyle}>Ovdizzle</p>
          <p className={itemStyle}>@soft</p>
          <p className={itemStyle}>5</p>
          <p className='text-lg text-green-700 text-center'>+50%</p>
        </div> */}
      </section>
    </main>
  );
};

export default memo(Accounts);
