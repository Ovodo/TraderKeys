"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ScaleLoader } from "react-spinners";
import { motion } from "framer-motion";
import InputLine from "../input/InputLine";
import { User } from "@/lib/types";
import {
  getKeyBalance,
  getSellPrice,
  getSellPriceAfterFees,
  sellKeys,
} from "@/lib/contract";
import useFonts from "@/hooks/useFonts";
type Props = {
  author: string;
  keyAddress: string;
  user: User;
};

const SellModal = ({ author, keyAddress, user }: Props) => {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [price, setPrice] = useState<number>(0.0);
  const [priceAfterFees, setPriceAfterFees] = useState<number>(0);
  const [amount, setAmount] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();
  const { agba } = useFonts();

  // ______________________-Functions________________________________________-
  const Sell = async () => {
    try {
      setIsLoading(true);
      await sellKeys(user, keyAddress, amount);
      setMessage(`${amount} ${author} sold successfully`);

      setIsLoading(false);
    } catch (error) {
      console.error("error", error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
      setIsLoading(false);
    }
  };

  // ______________________-UseEffects________________________________________-

  useEffect(() => {
    // function to set Prices before and after fees as soon as the user enters amount
    const setPrices = async () => {
      // const balance = await getKeyBalance(user.publicKey, keyAddress);
      // console.log(amount, "is less than", balance);
      // if (amount < balance) {
      //   // setError("Not enough keys to sell");
      //   console.log("wrong");

      //   return;
      // }
      const price = await getSellPrice(keyAddress, amount);
      const priceAfter = await getSellPriceAfterFees(keyAddress, amount);
      setPrice(price);
      setPriceAfterFees(priceAfter);
    };
    if (amount !== 0 && keyAddress !== "") {
      setPrices();
    }
  }, [amount, keyAddress]);

  // Logic to display loading, error and success messages when the user confirms the transaction or action

  if (isLoading) {
    return (
      <div
        className={`absolute ${agba.className} text-black top-0 flex items-center justify-center left-0 w-full h-full`}
      >
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "55%" }}
          exit={{ width: "0%" }}
          className='bg-white rounded-md shadow-sm shadow-slate-900 py-2 z-20 relative  flex flex-col items-center justify-center w-[55vw] h-[200px]'
        >
          <ScaleLoader color='#264653' />
        </motion.div>
      </div>
    );
  }

  if (error || message) {
    return (
      <div
        className={`absolute ${agba.className} text-black top-0 flex items-center justify-center left-0 w-full h-full`}
      >
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "55%" }}
          exit={{ width: "0%" }}
          className='bg-white rounded-md shadow-sm shadow-slate-900 py-2 z-20 relative  flex flex-col items-center justify-center w-[55vw] h-[200px]'
        >
          <p>{`${error ? "📛" : "✅"}`}</p>
          <p className={`${error ? "text-red-600" : "text-green-600"}`}>
            {error || message}
          </p>
          <Link href={pathname}>
            <button
              onClick={() => router.refresh()}
              className={`${
                error ? "bg-appOrange" : "bg-appGreen"
              } absolute bottom-2 hover:opacity-80 active:scale-90  left-[50%] -translate-x-1/2  rounded-sm  px-5 py-2`}
            >
              {error ? "  Cancel" : "Done"}
            </button>
          </Link>
        </motion.div>
      </div>
    );
  }

  //Render Main Modal

  return (
    <div
      className={`absolute ${agba.className} text-black  top-0 flex items-center justify-center left-0 w-full h-full`}
    >
      <div className='w-full h-full absolute top-0 left-0 z-10  flex items-center justify-center bg-opacity-70 bg-slate-800'></div>
      <motion.div
        initial={{ width: "0%" }}
        animate={{ width: "55%" }}
        exit={{ width: "0%" }}
        className='bg-white rounded-md shadow-sm shadow-slate-900 py-2 z-20 relative  flex flex-col items-center justify-start w-[55vw] h-[600px]'
      >
        <div className='absolute bottom-5 space-x-16'>
          <Link href={pathname.split("?modal")[0]}>
            <button className='bg-appOrange hover:opacity-80 active:scale-90 mx-auto rounded-sm  px-5 py-2'>
              Cancel
            </button>
          </Link>
          <button
            disabled={amount == 0}
            onClick={Sell}
            className='bg-appGreen hover:opacity-80 active:scale-90 disabled:opacity-30 mx-auto rounded-sm  px-5 py-2'
          >
            Confirm
          </button>
        </div>
        <h3 className='text-left'>{`Sell ${amount} ${author}  keys`}</h3>

        <div className='flex justify-around mt-10 place-items-center w-[100%] px-10'>
          <p className='w-[50%]'>Amount</p>
          <input
            onChange={(e) => setAmount(e.target.value as unknown as number)}
            className='border w-[40%] outline-1'
            type='number'
          />
        </div>
        <div className='flex justify-around mt-8 place-items-center w-[100%] px-10'>
          <p className='w-[50%]'>Price</p>
          <div className='w-[40%]'>
            <InputLine value={price} placeholder='Price' />
          </div>
        </div>
        <div className='flex justify-around mt-8 place-items-center w-[100%] px-10'>
          <p className='w-[50%]'>Price after fees</p>
          <div className='w-[40%]'>
            <InputLine value={priceAfterFees} placeholder='Price' />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SellModal;
