import AddButton from "@/components/button/AddButton";
import Image from "next/image";
import React from "react";
import Key from "@/public/key.svg";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";
import Copy from "@/components/utils/Copy";
import BuyButton from "@/components/button/BuyButton";
import InitModal from "@/components/modals/InitModal";
import NewTicketModal from "@/components/modals/NewTicketModal";

const itemStyle = "text-lg text-slate-900 text-center border-r border-black";

const Page = async ({
  params,
  searchParams,
}: {
  params: { name: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const session = (await getServerSession(authOptions)) as Session;
  const showModal = searchParams?.modal;
  console.log(showModal);

  return (
    <main className='flex min-h-screen  relative bg-gradient-to-b from-appRed to-appYellow flex-col items-center justify-start px-10 py-5'>
      <div className='flex  flex-col justify-center space-x-5 absolute bottom-5 right-10  items-center'>
        <h4 className='text-3xl text-appBlue font-semibold'>New Ticket</h4>
        <AddButton path='?modal=true' />
      </div>
      <h4 className='text-2xl absolute bottom-3 left-2 text-appBlue font-semibold'>
        {`${session.user.name}`}
      </h4>
      <section
        id='TOP'
        className='w-full border-b pb-1 flex border-appBlue justify-around'
      >
        <div className='flex flex-col space-y-3  items-center'>
          <div className='flex space-x-5 items-center'>
            <h4 className='text-2xl text-appBlue font-semibold'>
              {`@${params.name}`}
            </h4>
            <Image
              priority
              width={15}
              height={15}
              className='rotate-90'
              src={Key}
              alt='keys'
            />
          </div>
          <BuyButton />
        </div>
        <div className='text-appBlue  borde flex flex-col items-center justify-around text-3xl'>
          <div className='flex'>
            <p className='whitespace-nowrap'>Total Supply:</p>
          </div>
          <p className='text-2xl whitespace-nowrap'> 500 Units</p>
        </div>
        <div className='text-appBlue  borde flex flex-col items-center justify-around text-3xl'>
          <div className='flex'>
            <p className=''>Price:</p>
          </div>
          <p className='text-2xl'>180.00</p>
        </div>
        <div className='text-appBlue  borde flex flex-col items-center justify-around text-3xl'>
          <div className='flex'>
            <p className=''>PNL:</p>
          </div>
          <p className='text-2xl text-green-700'>28%</p>
        </div>
      </section>
      {showModal && <NewTicketModal />}
      <section className='h-[70vh] mt-5 self-start bg-appCream w-[75%]  border-2 border-appOrange border-opacity-10'>
        <h4 className='text-3xl cursor-pointer w-full text-center text-appBlue font-semibold'>
          Tickets
        </h4>
        <div className=' w-full border-double border-y border-opacity-50 border-slate-900 grid grid-cols-[0.3fr,2.5fr,1.5fr,1fr,1fr,1fr]'>
          <p className={itemStyle}>SN</p>
          <p className={itemStyle}>ID</p>
          <p className={itemStyle}>PAIR</p>
          <p className={itemStyle}>OPEN PRICE</p>
          <p className={itemStyle}>CLOSE PRICE</p>
          <p className='text-lg text-slate-900 text-center'>PNL</p>
        </div>
      </section>
    </main>
  );
};

export default Page;
