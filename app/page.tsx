// "use client";

import Copy from "@/components/utils/Copy";
import { authOptions, getServerAuthSession } from "@/server/auth";
import { Session, getServerSession } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Key from "@/public/key.svg";
import AddButton from "@/components/button/AddButton";
import InitModal from "@/components/modals/InitModal";
import { usePathname } from "next/navigation";
import { buyKeys, getAptosBalance, getKeyBalance } from "@/lib/contract";
import { stringToKeySubjectAddress } from "@/lib/actions";
import { AptosAccount } from "aptos";
import { baseUrl } from "@/config";
import { Key as Keys } from "@/lib/types";
import useFonts from "@/hooks/useFonts";
import Link from "next/link";

type Props = {
  searchParams: Record<string, string> | null | undefined;
};

const getKeys = async () => {
  const res = await fetch(`${baseUrl}/api/key/keys`);
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  const data = res.json();
  return data;
};

export default async function Home({ searchParams }: Props) {
  const session = (await getServerAuthSession()) as Session;
  const showModal = searchParams?.modal;
  const bal = await getAptosBalance(session.user.address);
  const keys: Keys[] = await getKeys();
  const keyBalance = await getKeyBalance(
    session.user.address,
    session.user.address
  );
  const init_Key = keys.find((key) => key.address === session.user.address);
  return (
    <main className='flex min-h-screen relative bg-gradient-to-b from-appRed to-appYellow flex-col items-center justify-between p-24'>
      <section id='TOP' className='flex justify-start w-full'>
        <div className='flex flex-col absolute top-5 left-10  items-center'>
          <div className='flex space-x-12  items-center'>
            <h4 className='text-5xl text-appBlue font-semibold'>
              {init_Key ? init_Key.name : "Initialize"}
            </h4>
            <Link
              href={`/keys/${init_Key?.name.slice(1, init_Key.name.length)}`}
            >
              <Image
                width={30}
                height={30}
                className='rotate-90 cursor-pointer'
                src={Key}
                alt='keys'
              />
            </Link>
          </div>
          {!init_Key && <AddButton path='/?modal=true' />}
        </div>
        <div className='text-appBlue absolute top-5 right-10 borde flex flex-col items-center justify-around text-lg'>
          <div className='flex'>
            <p className='truncate '>
              {session.user.address.slice(0, 5).concat("...")}
            </p>
            <Copy content={session.user.address} />
          </div>
          <p className='text-3xl'> {`${bal} APT`}</p>
        </div>
        {showModal && <InitModal user={session.user} />}
      </section>
      <div className='absolute left-5 top-48 h-[58vh] bg-appCream w-[35%]  border-2 border-appOrange border-opacity-10'>
        <h4 className='text-3xl cursor-pointer w-full text-center text-appBlue font-semibold'>
          My Keys
        </h4>
        <div className=' w-full border-double border-y border-opacity-50 border-slate-900 grid grid-cols-[.5fr,4.5fr,1fr,1fr]'>
          <p className='text-lg text-slate-900 text-center border-r border-black'>
            SN
          </p>
          <p className='text-lg text-slate-900 text-center border-r border-black'>
            KEYS
          </p>
          <p className='text-lg text-slate-900 text-center border-r border-black'>
            AMT
          </p>
          <p className='text-lg text-slate-900 text-center'>VAL</p>
        </div>
      </div>
      <div className='absolute right-5 top-48 h-[58vh] bg-appCream w-[35%]  border-2 border-appOrange border-opacity-10'>
        <h4 className='text-3xl cursor-pointer w-full text-center text-appBlue font-semibold'>
          Recent Tickets
        </h4>
        <div className=' w-full border-double border-y border-opacity-50 border-slate-900 grid grid-cols-[.5fr,3.5fr,2fr,1fr]'>
          <p className='text-lg text-slate-900 text-center border-r border-black'>
            SN
          </p>
          <p className='text-lg text-slate-900 text-center border-r border-black'>
            ID
          </p>
          <p className='text-lg text-slate-900 text-center border-r border-black'>
            PAIR
          </p>
          <p className='text-lg text-slate-900 text-center'>PNL</p>
        </div>
      </div>

      <div className='absolute text-appBlue text-2xl w-[50vw] flex px-5 justify-around self-center bottom-3'>
        <p>{`Protocol Fee:${"20%"}`}</p>
        <p>{`Subject Fee:${"20%"}`}</p>
      </div>
    </main>
  );
}
