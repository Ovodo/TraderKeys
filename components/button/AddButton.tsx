"use client";

import { stringToKeySubjectAddress } from "@/lib/actions";
import {
  getBuyPrice,
  getKeyBalance,
  getKeyHolders,
  getTradeHistory,
} from "@/lib/contract";
import { HexString } from "aptos";
import Link from "next/link";

const AddButton = ({ path }: { path: string }) => {
  const hash = stringToKeySubjectAddress("@ovdizzle");
  return (
    <Link href={path}>
      <button
        onClick={async () => {
          console.log("buying");

          console.log(
            await getBuyPrice(
              "0xf6c10e728de02fac4cbb99c523ccf072602154f8091d82747a607015913bb4cc",
              20
            )
          );
        }}
        // onClick={async () =>
        //   console.log(
        //     await getKeyHolders(
        //       "0xf6c10e728de02fac4cbb99c523ccf072602154f8091d82747a607015913bb4cc"
        //     )
        //   )
        // }
        // onClick={async () => console.log(decryptedData)}
        className='bg-appGreen active:scale-90 duration-100 rounded-full centralize  w-14 h-14 text-4xl shadow-md hover:opacity-70 hover:scale-105 shadow-slate-500'
      >
        +
      </button>
    </Link>
  );
};

export default AddButton;
