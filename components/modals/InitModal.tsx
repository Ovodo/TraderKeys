"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Jacques_Francois } from "next/font/google";
import { useState } from "react";
import { ScaleLoader } from "react-spinners";
import { baseUrl } from "@/config";
import axios from "axios";
import { User } from "next-auth";
import { motion } from "framer-motion";
import { getPrivateKey, newUser } from "@/lib/actions";

const agba = Jacques_Francois({ weight: "400", subsets: ["latin"] });

const InitModal = ({ user }: { user: User }) => {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState(String);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();
  const initialize = async () => {
    // console.log("2", newUser(user).privateKey);
    try {
      setIsLoading(true);
      console.log("ADd", name);
      const res = await axios.post(`${baseUrl}/api/key/init`, {
        name,
        user,
      });
      console.log("resP", res);
      setMessage(res.data.message);
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

  if (pathname !== "/") {
    return null;
  }
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
          <Link href={"/"}>
            <button
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

  return (
    <div
      className={`absolute ${agba.className} top-0 flex items-center justify-center left-0 w-full h-full`}
    >
      <div className='w-full h-full absolute top-0 left-0 z-10  flex items-center justify-center bg-opacity-70 bg-slate-800'></div>
      <motion.div
        initial={{ width: "0%" }}
        animate={{ width: "55%" }}
        exit={{ width: "0%" }}
        className='bg-white rounded-md shadow-sm shadow-slate-900 py-2 z-20 relative  flex flex-col items-center justify-between w-[55vw] h-[200px]'
      >
        <p className=''>Key addresses must start with the @ symbol</p>
        <div className='flex items-center'>
          <label className='mr-3'>Address:</label>
          <input
            value={name}
            onChange={(e) => {
              if (e.target.value.startsWith("@")) {
                setName(e.target.value);
              }
            }}
            type='text'
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
            disabled={name.length < 4}
            onClick={initialize}
            className='bg-appGreen disabled:opacity-30 mx-auto rounded-sm  px-5 py-2'
          >
            Init
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default InitModal;
