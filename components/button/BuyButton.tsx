"use client";

import Link from "next/link";

const BuyButton = ({ path, text }: { path: string; text?: string }) => {
  return (
    <Link href={path}>
      <button className='bg-appGreen text-appYellow active:scale-90 duration-200 rounded-sm px-2 py-1 text-xl shadow-sm hover:opacity-95 hover:scale-105 shadow-slate-500'>
        {text || "Buy"}
      </button>
    </Link>
  );
};

export default BuyButton;
