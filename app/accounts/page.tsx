import AddButton from "@/components/button/AddButton";
import Image from "next/image";
import React from "react";
import Key from "@/public/key.svg";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";
import Copy from "@/components/utils/Copy";
import BuyButton from "@/components/button/BuyButton";
import SearchComponent from "@/components/input/SearchComponent";

const itemStyle = "text-lg text-slate-900 text-center border-r border-black";

const Page = async () => {
  const session = (await getServerSession(authOptions)) as Session;
  // const showModal = searchParams?.modal;
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
        <div className=' w-full border-double border-y border-opacity-50 border-slate-900 grid grid-cols-[0.3fr,2.5fr,1.5fr,1fr]'>
          <p className={itemStyle}>SN</p>
          <p className={itemStyle}>ACCOUNT</p>
          <p className={itemStyle}>KEYS</p>
          <p className='text-lg text-slate-900 text-center'>PNL</p>
        </div>
        <div className=' w-full border-double border- border-opacity-50 border-slate-900 grid grid-cols-[0.3fr,2.5fr,1.5fr,1fr]'>
          <p className={itemStyle}>01</p>
          <p className={itemStyle}>Ja$$man</p>
          <p className={itemStyle}>4</p>
          <p className='text-lg text-green-700 text-center'>120%</p>
        </div>
        <div className=' w-full border-double border- border-opacity-50 border-slate-900 grid grid-cols-[0.3fr,2.5fr,1.5fr,1fr]'>
          <p className={itemStyle}>02</p>
          <p className={itemStyle}>Ovdizzle</p>
          <p className={itemStyle}>5</p>
          <p className='text-lg text-green-700 text-center'>+50%</p>
        </div>
      </section>
    </main>
  );
};

export default Page;
