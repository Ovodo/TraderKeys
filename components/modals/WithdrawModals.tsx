"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ScaleLoader } from "react-spinners";
import { User } from "next-auth";
import { motion } from "framer-motion";
import { newUser } from "@/lib/actions";
import { withdrawApt } from "@/lib/contract";
import useFonts from "@/hooks/useFonts";

const WithdrawModals = ({ user, balance }: { user: User; balance: number }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [address, setAddress] = useState(String);
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();
  const { agba } = useFonts();

  const withdraw = async () => {
    try {
      const privateKey = (await newUser(user)).privateKey;
      const aptAmount = amount * 1_0000_0000;
      if (balance < amount) {
        alert("Insufficient Funds");
        return;
      }
      setIsLoading(true);
      await withdrawApt(privateKey, address, aptAmount);
      setMessage(`${amount} APT withdrawn successfully`);
      setIsLoading(false);
    } catch (error: any) {
      console.error("error", error);
      setError("Error withdrawing APT");

      setIsLoading(false);
    }
  };
  // Logic to display loading, error and success messages when the user confirms the transaction or action
  if (isLoading) {
    return (
      <div
        className={`absolute ${agba.className} top-0 flex items-center justify-center left-0 w-full h-full`}
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
        className={`absolute ${agba.className} top-0 flex items-center justify-center left-0 w-full h-full`}
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
          <Link href={"/profile"}>
            <button
              onClick={() => {
                router.refresh();
              }}
              className={`${
                error ? "bg-appOrange" : "bg-appGreen"
              } absolute bottom-2  left-[50%] -translate-x-1/2  rounded-sm  px-5 py-2`}
            >
              {error ? "  Cancel" : "Done"}
            </button>
          </Link>
        </motion.div>
      </div>
    );
  }

  // Main render Modal

  return (
    <div
      className={`absolute ${agba.className} top-0 flex items-center justify-center left-0 w-full h-full`}
    >
      <div className='w-full h-full absolute top-0 left-0 z-10  flex items-center justify-center bg-opacity-70 bg-slate-800'></div>
      <motion.div
        initial={{ width: "0%" }}
        animate={{ width: "55%" }}
        exit={{ width: "0%" }}
        className='bg-white rounded-md shadow-sm shadow-slate-900 py-2 z-20 relative  flex flex-col items-center justify-between w-[55vw] h-[400px]'
      >
        <p className=''>Enter address and amount to withdraw to</p>
        <div className='flex items-center'>
          <label className='mr-3'>Address:</label>
          <input
            id='Address'
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
            type='text'
            className=' outline-none border w-[250px] py-1 px-1 bg-slate-300 '
          />
        </div>
        <div className='flex items-center'>
          <label className='mr-3'>Amount:</label>
          <input
            id='Amount'
            onChange={(e) => {
              setAmount(parseFloat(e.target.value));
            }}
            type='number'
            className=' outline-none border w-[250px] py-1 px-1 bg-slate-300 '
          />
        </div>
        <div className='space-x-16'>
          <Link href={"/"}>
            <button className='bg-appOrange mx-auto rounded-sm  px-5 py-2'>
              Cancel
            </button>
          </Link>
          <button
            disabled={!address || !amount}
            onClick={withdraw}
            className='bg-appGreen disabled:opacity-30 mx-auto rounded-sm  px-5 py-2'
          >
            Send
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default WithdrawModals;
