"use client";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Jacques_Francois } from "next/font/google";
import { useEffect, useState } from "react";
import { ScaleLoader } from "react-spinners";
import { baseUrl } from "@/config";
import axios from "axios";
import { User } from "next-auth";
import { motion } from "framer-motion";
import { getPrivateKey, newUser } from "@/lib/actions";
import SelectComponent from "../input/SelectComponent";
import InputLine from "../input/InputLine";
import { Ticket } from "@/lib/types";
import Error from "next/error";
type Props = {
  author: string;
  // validate: (item: string) => void;
};
const agba = Jacques_Francois({ weight: "400", subsets: ["latin"] });

const NewTicketModal = ({ author }: Props) => {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("kklkl");
  // const [category, setCategory] = useState([]);
  const [price, setPrice] = useState<number>(0.0);
  const [categoryData, setCategoryData] = useState<any[]>([]);
  const [priceData, setPriceData] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get("category")?.toLowerCase() as string;
  const asset = searchParams.get("asset") as string;
  const getData = () => console.log(category);
  const queryString = useSearchParams().toString();

  // ______________________-Functions________________________________________-
  const createTicket = async () => {
    console.log("Creating Ticket");

    try {
      setIsLoading(true);
      const res = await axios.post(`${baseUrl}/api/ticket/create`, {
        author,
        category,
        asset,
        open: price,
      });
      setMessage(res.data.message);
      setIsLoading(false);
    } catch (error: any) {
      console.error("error", error);
      setError(error.response.data.message);

      setIsLoading(false);
      setIsLoading(false);
    }
  };

  const ticketCategory = async () => {
    console.log("setting category");

    const options = {
      method: "GET",
      // url: `https://bloomberg-api.p.rapidapi.com/bloomberg/${category}`,
      url: `https://api.binance.com/api/v3/exchangeInfo`,
      // headers: {
      //   "X-RapidAPI-Key": "58fc9fd74dmsh1504f4f7cbba02dp135d7djsn0d51e3009846",
      //   "X-RapidAPI-Host": "bloomberg-api.p.rapidapi.com",
      // },
    };

    try {
      const response = await axios.request(options);
      const dataObject = response.data;

      // Convert the object to an array of objects
      const dataArray = dataObject.symbols
        .map((item: any) => item.symbol)
        .filter((item: string) => item.includes("USDT"))
        .sort((a: any, b: any) => {
          // Compare the items alphabetically
          return a.localeCompare(b);
        });

      setCategoryData(dataArray);
    } catch (error) {
      console.error(error);
    }
  };
  const getPrice = async (item: string | undefined) => {
    console.log("setting price");

    const options = {
      method: "GET",
      url: `https://api.binance.com/api/v3/ticker/price?symbol=${item}`,
    };

    try {
      const response = await axios.request(options);
      const price = response.data.price as number;
      setPrice(price);
    } catch (error) {
      console.error(error);
    }
  };

  // ______________________-UseEffects________________________________________-

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
              onClick={() => router.refresh()}
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
      className={`absolute ${agba.className}  top-0 flex items-center justify-center left-0 w-full h-full`}
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
            <button className='bg-appOrange mx-auto rounded-sm  px-5 py-2'>
              Cancel
            </button>
          </Link>
          <button
            disabled={asset == undefined || category == undefined || price == 0}
            onClick={createTicket}
            className='bg-appGreen disabled:opacity-30 mx-auto rounded-sm  px-5 py-2'
          >
            Create
          </button>
        </div>
        <h3 className='text-left'>Create a new ticket</h3>

        <div className='flex justify-around mt-10 place-items-center w-[100%] px-10'>
          <p className=''>Category</p>
          <SelectComponent
            path={`?modal=true&category=`}
            updateFunction={ticketCategory}
            items={["Crypto", "Metals", "Agriculture", "Energy", "Commodities"]}
            placeholder='Ticket category'
          />
        </div>
        <div className='flex justify-around mt-8 place-items-center w-[100%] px-10'>
          <p className=''>Asset</p>
          <SelectComponent
            path={`?modal=true&category=${category}&asset=`}
            updateFunction={getPrice}
            items={category === "crypto" ? categoryData : ["NOT AVAILABLE"]}
            placeholder='Choose asset'
          />
        </div>
        <div className='flex justify-around mt-8 place-items-center w-[100%] px-10'>
          <p className=''>Price</p>
          <div>
            <InputLine value={price} placeholder='Price' />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default NewTicketModal;
