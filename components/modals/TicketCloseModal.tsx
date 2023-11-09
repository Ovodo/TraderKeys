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
import { ObjectId } from "mongodb";

const agba = Jacques_Francois({ weight: "400", subsets: ["latin"] });
type Props = {
  author: string;
  id: string;
};

const TicketCloseModal = ({ author, id }: Props) => {
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
      const res = await axios.post(`${baseUrl}/api/key/init`, {
        name,
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

  const closeTicket = async (item: string, id: string) => {
    setIsLoading(true);
    const res = await fetch(`${baseUrl}/api/ticket/close/${item}/${id}`);
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      const data = await res.json();
      console.log("data", data.message);
      setError(data.message);

      setIsLoading(false);
      // throw new Error("Failed to fetch data");
    }
    const data = await res.json();
    setMessage(data.message);
    console.log("data", data.message);
    setIsLoading(false);
  };

  //   if (pathname !== "/") {
  //     return null;
  //   }
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
          <Link href={`/keys/${author}`}>
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
        className='bg-white rounded-md shadow-sm shadow-slate-900 py-2 z-20 relative  flex flex-col items-center justify-center space-y-10 w-[55vw] h-[200px]'
      >
        <p className=''>{`Click confirm to close ticket at current price`}</p>

        <div className='space-x-16'>
          <Link href={`/keys/${author}`}>
            <button className='bg-appOrange mx-auto rounded-sm  px-5 py-2'>
              Cancel
            </button>
          </Link>
          <button
            // disabled={name.length < 4}
            onClick={() => {
              console.log(author);

              closeTicket(author, id);
            }}
            className='bg-appGreen active:scale-95 disabled:opacity-30 mx-auto rounded-sm  px-5 py-2'
          >
            Confirm
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default TicketCloseModal;
