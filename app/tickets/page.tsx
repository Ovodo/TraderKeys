import AddButton from "@/components/button/AddButton";
import Image from "next/image";
import React from "react";
import Key from "@/public/key.svg";
import { Session, getServerSession } from "next-auth";
import { authOptions, getServerAuthSession } from "@/server/auth";
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
  const res = await fetch(`${baseUrl}/api/ticket/get`);
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary

    throw new Error("Failed to fetch data");
  }
  const data = res.json();
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
  const session = (await getServerAuthSession()) as Session;
  const user = await newUser(session.user);
  const [tickets]: [Ticket[]] = await Promise.all([getTickets(params.name)]);
  const pnl = tickets.reduce(
    (total, ticket) => total + (ticket.pnl as number),
    0
  );

  return (
    <main className='flex min-h-screen  relative bg-gradient-to-b from-appRed to-appYellow flex-col items-center justify-start px-10 py-5'>
      <h4 className='text-2xl absolute bottom-3 left-2 text-appBlue font-semibold'>
        {`${session.user.name}`}
      </h4>
      <section className='h-[70vh] mt-5 overflow-scroll scrollbar-hide self-start bg-appCream w-[80%]  border-2 border-appOrange border-opacity-10'>
        <h4 className='text-3xl cursor-pointer w-full text-center text-appBlue font-semibold'>
          All Tickets
        </h4>
        <div className=' w-full border-double border-y border-opacity-50 border-slate-900 grid grid-cols-[0.3fr,2.5fr,1.2fr,1fr,1fr,.8fr,.7fr]'>
          <p className={itemStyle}>SN</p>
          <p className={itemStyle}>KEY</p>
          <p className={itemStyle}>ASSET</p>
          <p className={itemStyle}>OPEN </p>
          <p className={itemStyle}>CLOSE</p>
          <p className={itemStyle}>PNL</p>
          <p className='text-lg text-slate-900 text-center'>STATUS</p>
        </div>
        {tickets.map((ticket, index) => {
          const pnl = Math.round(ticket.pnl as number);
          return (
            <div
              key={ticket._id.toString()}
              className=' w-full border-double border-y border-opacity-50 border-slate-900 grid grid-cols-[0.3fr,2.5fr,1.2fr,1fr,1fr,.8fr,.7fr]'
            >
              <p className={itemStyle}>{index}</p>
              <Link href={`keys/${ticket.author}`} className={itemStyle}>
                <p>{`@${ticket.author}`}</p>
              </Link>
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

              <button
                disabled={ticket.closed}
                className={`text-sm mx-2 py-1 my-2 px-2 rounded-md hover:opacity-80 disabled:opacity-50  hover:scale-95 duration-200 ${
                  ticket.closed ? "bg-slate-500" : "bg-green-600 "
                }`}
              >
                {ticket.closed ? "Closed" : "Open"}
              </button>
            </div>
          );
        })}
      </section>
    </main>
  );
};

export default Page;
