// "use client";

import Copy from "@/components/utils/Copy";
import { getServerAuthSession } from "@/server/auth";
import { Session } from "next-auth";
import Image from "next/image";
import Key from "@/public/key.svg";
import AddButton from "@/components/button/AddButton";
import InitModal from "@/components/modals/InitModal";
import {
  getAptosBalance,
  getBuyPrice,
  getKeyBalance,
  getOwnedCollections,
  getProtocolFeePercentage,
  getSubjectFeePercentage,
} from "@/lib/contract";
import { newUser } from "@/lib/actions";
import { baseUrl } from "@/config";
import { PrivateKey } from "@/lib/types";
import Link from "next/link";
import SellModal from "@/components/modals/SellModal";
import BuyButton from "@/components/button/BuyButton";
import WithdrawModals from "@/components/modals/WithdrawModals";

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
  const sellModal = searchParams?.sell;
  const author = searchParams?.name;
  const withdraw = searchParams?.withdraw;
  const user = await newUser(session.user);
  const [bal, keys, keyBalance, protocolFees, subjectFees, ownedCollections] =
    await Promise.all([
      getAptosBalance(session.user.address),
      getKeys(),
      getKeyBalance(session.user.address, session.user.address),
      getProtocolFeePercentage(),
      getSubjectFeePercentage(),
      getOwnedCollections(user),
    ]);
  const init_Key: PrivateKey = keys.find(
    (key: PrivateKey) => key.address === session.user.address
  );

  const itemStyle =
    "text-lg text-slate-900 flex items-center justify-center border-r border-black";

  return (
    <main className='flex min-h-screen relative bg-gradient-to-b from-appRed to-appYellow flex-col items-center justify-between p-24'>
      <section id='TOP' className='flex justify-start w-full'>
        <div className='flex flex-col absolute top-5 left-10  items-center'>
          <Link href={`/keys/${init_Key?.name.slice(1, init_Key.name.length)}`}>
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
              <h4 className='text-5xl text-appBlue font-semibold'>
                {keyBalance}
              </h4>
            </div>
          </Link>

          {!init_Key && <AddButton path='/?modal=true' />}
        </div>
        <div className='text-appBlue absolute space-y-4 top-5 right-10 borde flex flex-col items-center justify-around text-lg'>
          <div className='flex'>
            <p className='truncate '>
              {session.user.address.slice(0, 5).concat("...")}
            </p>
            <Copy content={session.user.address} />
          </div>
          <p className='text-3xl'> {`${bal} APT`}</p>
          <BuyButton text='Withdraw' path='?withdraw=true' />
        </div>
        {showModal && <InitModal user={session.user} />}
        {withdraw && <WithdrawModals balance={bal} user={session.user} />}
        {sellModal && (
          <SellModal
            author={author as string}
            user={user}
            keyAddress={sellModal}
          />
        )}
      </section>
      <div className='absolute left-5 top-48 overflow-scroll scrollbar-hide h-[58vh] bg-appCream w-[60%]  border-2 border-appOrange border-opacity-10'>
        <h4 className='text-3xl cursor-pointer w-full text-center text-appBlue font-semibold'>
          My Keys
        </h4>
        <div className=' w-full border-double border-y border-opacity-50 border-slate-900 grid grid-cols-[.5fr,4fr,1fr,2fr,1.5fr]'>
          <p className={itemStyle}>SN</p>
          <p className={itemStyle}>KEYS</p>
          <p className={itemStyle}>AMT</p>
          <p className={itemStyle}>VAL</p>
        </div>
        {ownedCollections.map(async (item, index) => {
          const value = await getBuyPrice(item.address, item.keys);
          const name: PrivateKey = keys.find(
            (key: PrivateKey) => key.address === item.address
          );
          return (
            <div
              key={item.address}
              className=' w-full border-double border-y border-opacity-50 border-slate-900 grid grid-cols-[.5fr,4fr,1fr,2fr,1.5fr]'
            >
              <p className={itemStyle}>{index}</p>
              <Link
                className={itemStyle}
                href={`/keys/${name.name.slice(1, name.name.length)}`}
              >
                <p>
                  {`${item.address.slice(0, 5).concat("...")} (${name.name})`}
                </p>
              </Link>
              <p className={itemStyle}>{item.keys}</p>
              <p className={itemStyle}>{value}</p>
              <Link
                className='flex items-center justify-center'
                href={`?sell=${item.address}&name=${name.name}`}
              >
                <button className='bg-appOrange px-4 my-1 rounded-sm py-1'>
                  Sell
                </button>
              </Link>
            </div>
          );
        })}
      </div>
      <div className='absolute text-appBlue text-2xl w-[50vw] flex px-5 justify-around self-center bottom-3'>
        <p>{`Protocol Fee:${protocolFees}%`}</p>
        <p>{`Subject Fee:${subjectFees}%`}</p>
      </div>
    </main>
  );
}
