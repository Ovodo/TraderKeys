"use client";
import { getBuyPrice } from "@/lib/contract";
import { User } from "next-auth";
import React from "react";
import SearchComponent from "./input/SearchComponent";
import { useAppSelector } from "@/redux/hooks";
import Link from "next/link";
const itemStyle = "text-lg text-slate-900 text-center border-r border-black";

const Accounts = ({ data }: { data: User[] }) => {
  const { text } = useAppSelector((state) => state.Search);
  console.log(data);

  const users = data.filter(
    (item) =>
      (item.key as string)?.toLowerCase().includes(text.toLowerCase()) ||
      item.name.toLowerCase().includes(text.toLowerCase())
  );

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
        {users.map(async (user, index) => {
          const price = await getBuyPrice(user.address, 1);
          return (
            <div
              key={user.address}
              className=' w-full border-double border- border-opacity-50 border-slate-900 grid grid-cols-[0.3fr,1.5fr,1.5fr,1fr]'
            >
              <p className={itemStyle}>{index + 1}</p>
              <p className={itemStyle}>{user.name ?? "__"}</p>
              <Link href={`/keys/${user.key?.slice(1, user.key.length)}`}>
                <p className={`${itemStyle}`}>
                  {user.key?.slice(0, 5).concat("...") || "---"}
                </p>
              </Link>
              <p className='text-lg text-slate-900 text-center'>{price}</p>
            </div>
          );
        })}
      </section>
    </main>
  );
};

export default Accounts;

//Component to display accounts with search component to capture the input of the users query
// the useSelector and UseDispatch hooks from redux are used to store and read the users input
// and this value is used to filter the users array before displaying
