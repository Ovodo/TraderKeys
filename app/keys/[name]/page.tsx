import AddButton from "@/components/button/AddButton";
import Image from "next/image";
import React from "react";
import Key from "@/public/key.svg";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";
import BuyButton from "@/components/button/BuyButton";
import NewTicketModal from "@/components/modals/NewTicketModal";
import { baseUrl } from "@/config";
import { PrivateKey, Ticket } from "@/lib/types";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import TicketCloseModal from "@/components/modals/TicketCloseModal";
import BuyModal from "@/components/modals/BuyModal";
import { newUser } from "@/lib/actions";

const getTickets = async (item: string) => {
  const res = await fetch(`${baseUrl}/api/ticket/get/${item}`);
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary

    throw new Error("Failed to fetch data");
  }
  const data = res.json();
  return data;
};
const getKey = async (item: string) => {
  const res = await fetch(`${baseUrl}/api/key/get/${item}`);
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    console.log(res);

    throw new Error("Failed to fetch data");
  }
  const data = await res.json();

  return data;
};

const itemStyle =
  "text-lg text-slate-900 flex items-center justify-center text-center border-r border-black";

const Page = async ({
  params,
  searchParams,
}: {
  params: { name: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const session = (await getServerSession(authOptions)) as Session;
  const user = await newUser(session.user);
  const showModal = searchParams?.modal;
  const closeModal = searchParams?.id;
  const buyModal = searchParams?.buy;
  // const tickets: Ticket[] = await getTickets(params.name);
  // const singleKey = (await getKey(params.name)) as PrivateKey;
  const [tickets, singleKey]: [Ticket[], PrivateKey] = await Promise.all([
    getTickets(params.name),
    getKey(params.name),
  ]);
  const pnl = tickets.reduce(
    (total, ticket) => total + (ticket.pnl as number),
    0
  );

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
              {`${singleKey.name}`}
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
          <BuyButton path='?buy=true' />
        </div>
        <div className='text-appBlue  borde flex flex-col items-center justify-around text-3xl'>
          <div className='flex'>
            <p className='whitespace-nowrap'>Total Supply:</p>
          </div>
          <p className='text-2xl whitespace-nowrap'>
            {" "}
            {`${singleKey.supply} Unit`}
          </p>
        </div>
        <div className='text-appBlue  borde flex flex-col items-center justify-around text-3xl'>
          <div className='flex'>
            <p className=''>Price:</p>
          </div>
          <p className='text-2xl'>{singleKey.price}</p>
        </div>
        <div className='text-appBlue  borde flex flex-col items-center justify-around text-3xl'>
          <div className='flex'>
            <p className=''>PNL:</p>
          </div>
          <p className='text-2xl text-green-700'>{`${pnl.toFixed(1)}%`}</p>
        </div>
      </section>
      {showModal && <NewTicketModal author={params.name} />}
      {closeModal && (
        <TicketCloseModal author={params.name} id={closeModal as string} />
      )}
      {buyModal && (
        <BuyModal
          keyAddress={singleKey.address}
          user={user}
          author={params.name}
        />
      )}
      <section className='h-[70vh] mt-5 overflow-scroll scrollbar-hide self-start bg-appCream w-[80%]  border-2 border-appOrange border-opacity-10'>
        <h4 className='text-3xl cursor-pointer w-full text-center text-appBlue font-semibold'>
          Tickets
        </h4>
        <div className=' w-full border-double border-y border-opacity-50 border-slate-900 grid grid-cols-[0.3fr,2.5fr,1.2fr,1fr,1fr,.8fr,.7fr]'>
          <p className={itemStyle}>SN</p>
          <p className={itemStyle}>ID</p>
          <p className={itemStyle}>ASSET</p>
          <p className={itemStyle}>OPEN </p>
          <p className={itemStyle}>CLOSE</p>
          <p className={itemStyle}>PNL</p>
          <p className='text-lg text-slate-900 text-center'></p>
        </div>
        {tickets.map((ticket, index) => {
          const pnl = Math.round(ticket.pnl as number);
          return (
            <div
              key={ticket._id.toString()}
              className=' w-full border-double border-y border-opacity-50 border-slate-900 grid grid-cols-[0.3fr,2.5fr,1.2fr,1fr,1fr,.8fr,.7fr]'
            >
              <p className={itemStyle}>{index}</p>
              <p className={itemStyle}>{ticket._id.toString()}</p>
              <p className={itemStyle}>{ticket.asset}</p>
              <p className={itemStyle}>{(ticket.open as string).slice(0, 7)}</p>
              <p className={itemStyle}>
                {(ticket.close as string).slice(0, 7)}
              </p>
              <p
                className={`text-lg ${
                  pnl.toString().includes("-")
                    ? "text-red-600"
                    : pnl == 0
                    ? "text-slate-900"
                    : "text-green-500"
                }  text-center border-r border-black`}
              >
                {pnl}
              </p>
              <Link
                className='flex  items-center justify-center'
                href={`?id=${ticket._id.toString()}`}
              >
                <button
                  //
                  disabled={ticket.closed}
                  className={`text-sm mx-2 py-1 my-2 px-2 rounded-md hover:opacity-80 disabled:opacity-50  hover:scale-95 duration-200 ${
                    ticket.closed ? "bg-slate-500" : "bg-appOrange "
                  }`}
                >
                  {ticket.closed ? "Closed" : "Close"}
                </button>
              </Link>
            </div>
          );
        })}
      </section>
    </main>
  );
};

export default Page;
