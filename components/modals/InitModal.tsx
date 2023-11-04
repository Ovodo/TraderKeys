"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Jacques_Francois } from "next/font/google";

const agba = Jacques_Francois({ weight: "400", subsets: ["latin"] });

const InitModal = () => {
  const pathname = usePathname();

  if (pathname !== "/") {
    return null;
  }
  return (
    <div
      className={`absolute ${agba.className} top-0 flex items-center justify-center left-0 w-full h-full`}
    >
      <div className='w-full h-full absolute top-0 left-0 z-10  flex items-center justify-center bg-opacity-70 bg-slate-800'></div>
      <div className='bg-white rounded-md shadow-sm shadow-slate-900 py-2 z-20 relative  flex flex-col items-center justify-between w-[55vw] h-[200px]'>
        <p className=''>Key addresses must start with the "@" symbol</p>
        <div className='flex items-center'>
          <label className='mr-3'>Address:</label>
          <input
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
          <Link href={"/?modal=false"}>
            <button
              // onClick={() => router.push("/?modal=false")}
              className='bg-appGreen mx-auto rounded-sm  px-5 py-2'
            >
              Init
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InitModal;
