"use client";

import { Session } from "next-auth";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SwitchIcon } from "@radix-ui/react-icons";
import { signOut } from "next-auth/react";

const nav = [
  "Feed",
  "Profile",
  "Accounts",
  "Tickets",
  "Trade History",
  "Security",
];
const Dashboard = ({ session }: { session: Session }) => {
  const [hide, setHide] = useState(false);
  return (
    <div
      className={` ${
        !hide ? "w-[18%]" : "w-[2%]"
      } p-5 relative duration-500 bg-appBlue h-screen`}
    >
      <button onClick={() => setHide(!hide)} className='absolute top-2 right-1'>
        <SwitchIcon color='rgb(250 237 205)' />
      </button>
      {!hide && (
        <p
          onClick={() => signOut({ callbackUrl: "/" })}
          className='text-appCream absolute bottom-5 cursor-pointer tracking-wide hover:text-appOrange'
        >
          Log out
        </p>
      )}

      {!hide && (
        <>
          <section
            id='Header'
            className='flex w-full h-[100px] border-b border-double justify-center'
          >
            <div className='flex flex-col items-center justify-around'>
              <Image
                width={50}
                height={50}
                className='rounded-full'
                quality={100}
                src={session.user.image}
                alt='profile pic'
              />
              <p className='text-appCream text-xl tracking-wide'>
                {session.user.name}
              </p>
            </div>
          </section>
          <section id='list' className='mt-5'>
            <ul className='flex space-y-8 text-2xl flex-col'>
              {nav.map((item) => (
                <Link
                  key={item}
                  className='text-appCream tracking-wide hover:text-appOrange'
                  href={`/${
                    item == "Feed"
                      ? "/"
                      : item == "Trade History"
                      ? "history"
                      : item.toLowerCase()
                  }`}
                >
                  {item}
                </Link>
              ))}
            </ul>
          </section>
        </>
      )}
    </div>
  );
};

export default Dashboard;
