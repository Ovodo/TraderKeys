import React from "react";
import { Session } from "next-auth";
import { getServerAuthSession } from "@/server/auth";
import { getTradeHistory } from "@/lib/contract";

const itemStyle =
  "text-lg text-slate-900 flex items-center justify-center text-center border-r border-black";

const Page = async () => {
  const session = (await getServerAuthSession()) as Session;
  const history = await getTradeHistory();

  return (
    <main className='flex min-h-screen  relative bg-gradient-to-b from-appRed to-appYellow flex-col items-center justify-start px-10 py-5'>
      <h4 className='text-2xl absolute bottom-3 left-2 text-appBlue font-semibold'>
        {`${session.user.name}`}
      </h4>
      <section
        id='TOP'
        className='w-full mb-10 border-b mt-10 pb-1 flex border-appBlue justify-around'
      ></section>

      <section className='h-[70vh] mt-5 overflow-scroll scrollbar-hide self-start bg-appCream w-[90%]  border-2 border-appOrange border-opacity-10'>
        <h4 className='text-3xl cursor-pointer w-full text-center text-appBlue font-semibold'>
          History
        </h4>
        <div className=' w-full border-double border-y border-opacity-50 border-slate-900 grid grid-cols-[0.3fr,1.5fr,.8fr,1fr,1fr,1fr,1fr,.7fr]'>
          <p className={itemStyle}>SN</p>
          <p className={itemStyle}>TRADER</p>
          <p className={itemStyle}>KEY</p>
          <p className={itemStyle}>AMOUNT</p>
          <p className={itemStyle}>PRICE</p>
          <p className={itemStyle}>SUBJECT FEE</p>
          <p className={itemStyle}>PROTOCOL FEE</p>
          <p className='text-lg text-slate-900 text-center'>ORDER</p>
        </div>
        {history.map((item, index) => {
          return (
            <div
              key={index.toString()}
              className=' w-full border-double border-y border-opacity-50 border-slate-900 grid grid-cols-[0.3fr,1.5fr,.8fr,1fr,1fr,1fr,1fr,.7fr]'
            >
              <p className={itemStyle}>{index}</p>
              <p className={itemStyle}>
                {item.data.trader.slice(0, 8).concat("...")}
              </p>
              <p className={itemStyle}>
                {item.data.subject.slice(0, 8).concat("...")}
              </p>
              <p className={itemStyle}>{item.data.key_amount}</p>
              <p className={itemStyle}>
                {(item.data.purchase_apt_amount / 1_0000_0000).toFixed(8)}
              </p>
              <p className={itemStyle}>
                {(item.data.subject_fee_apt_amount / 1_0000_0000).toFixed(8)}
              </p>
              <p className={itemStyle}>
                {(item.data.protocol_fee_apt_amount / 1_0000_0000).toFixed(8)}
              </p>
              <p className='text-lg text-slate-900 text-center'>
                {item.data.is_buy ? "BUY" : "SELL"}
              </p>
            </div>
          );
        })}
      </section>
    </main>
  );
};

export default Page;
