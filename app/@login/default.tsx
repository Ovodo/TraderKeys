"use client";

import { TwitterLogoIcon } from "@radix-ui/react-icons";
import { signIn } from "next-auth/react";
import React from "react";

export default function Login() {
  return (
    <main className='flex min-h-screen  flex-col items-center space-y-14 justify-center md:justify-between md:p-24'>
      <p className='text-[80px] whitespace-nowrap md:text-[120px] text-appBlue'>
        Trader Keys
      </p>
      <div className=' w-[75vw] md:w-[60vw] relative flex flex-col justify-center items-center rounded-t-sm h-[160px] md:bg-appYellow'>
        <p className='md:animate-bounce hidden md:flex absolute self-center top-12 md:top-5  text-2xl text-appBlue text-center'>
          Click below to loginssss
        </p>
        <TwitterLogoIcon
          color='#264653'
          className='absolute  w-8 h-8 md:w-10 md:h-10 top-5 right-5'
        />
        <button
          // onClick={async () => await getServerSession(authOptions)}
          onClick={() => signIn("twitter")}
          className='font-semibold shadow-sm hover:bg-appRed hover:text-appGreen shadow-appBlue active:opacity-40 active:scale-105 duration-100 px-7 py-3 max-w-max rounded-md text-appBlue tracking-wider  bg-appOrange relative top-9 md:top- text-2xl'
        >
          Login
        </button>
      </div>
    </main>
  );
}
