"use client";
import React, { useState } from "react";
import InputLine from "./input/InputLine";
import axios from "axios";
import { baseUrl } from "@/config";
import { User } from "next-auth";
import { ScaleLoader } from "react-spinners";
import { motion } from "framer-motion";
import { Jacques_Francois } from "next/font/google";
import { usePathname } from "next/navigation";
import Link from "next/link";

type Props = {
  user: User;
  secret: string | null;
  privateKey: string;
};

const agba = Jacques_Francois({ weight: "400", subsets: ["latin"] });

const Security = ({ user, secret, privateKey }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [show, setShow] = useState(false);
  const pathname = usePathname();

  const sendPassword = async () => {
    setIsLoading(true);
    if (password.length <= 8) {
      alert("Passwords must be more than 8 characters 🔑");
      setIsLoading(false);
      return;
    }
    if (secret === password) {
      setShow(true);
      setIsLoading(false);
      return;
    }
    if (password !== password2) {
      alert("Passwords do not match 🔑");
      setIsLoading(false);
      return;
    }

    try {
      const res = await axios.post(`${baseUrl}/api/password`, {
        password,
        user,
      });
      const data = res.data;
      console.log("data", data);
      setMessage(data.message);

      setShow(true);
      setIsLoading(false);
    } catch (error: any) {
      console.error(error);
      setError(error.response.data.message);
      setIsLoading(false);
    }
  };

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
          <Link href={pathname}>
            <button
              onClick={() => {
                setIsLoading(false);
                setError(null);
                setMessage(null);
              }}
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

  return (
    <section className='mt-2 flex flex-col'>
      <p className='text-lg mt-2 font-semibold'>
        Create a strong password to reveal your private key. It is adviced to
        keep your private key in a safe place and also keep this password hidden
        to prevent hacks to your account
      </p>
      <p className='text-lg my-2 font-semibold'>
        Passwords must be more than 8 characters
      </p>

      <div className='flex flex-col w-[40vw]'>
        <div className='mt-5'>
          <p className='w-[40%] mb-2'>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            className='border  pl-2  py-2 w-[100%]'
            type='password'
          />
        </div>
        {secret == null && (
          <div className='mt-5'>
            <p className='w-[40%] mb-2'>Confirm Password</p>
            <input
              onChange={(e) => setPassword2(e.target.value)}
              className='border pl-2  py-2  w-[100%]'
              type='password'
            />
          </div>
        )}
        <button
          onClick={sendPassword}
          className='bg-appGreen mr-4 mt-4 self-end text-appYellow active:scale-90 duration-200 rounded-sm w-20 py-1 text-xl shadow-sm hover:opacity-95 hover:scale-105 shadow-slate-500'
        >
          Reveal
        </button>
      </div>
      <p className='text-lg mt-20 font-semibold'>Your Private Key</p>
      {show ? (
        <InputLine
          styles='w-[60vw]'
          placeholder='***********************************************'
          value={privateKey}
        />
      ) : (
        <InputLine
          styles='w-[60vw]'
          placeholder='********************************************'
        />
      )}
    </section>
  );
};

export default Security;
