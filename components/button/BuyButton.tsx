"use client";

import Link from "next/link";

const BuyButton = () => {
  return (
    // <Link href={path}>
    <button className='bg-appGreen text-appYellow    active:scale-90 duration-200 rounded-sm w-20 py-1 text-xl shadow-sm hover:opacity-95 hover:scale-105 shadow-slate-500'>
      Buy
    </button>
    // </Link>
  );
};

export default BuyButton;
