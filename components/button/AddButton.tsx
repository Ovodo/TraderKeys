"use client";
import Link from "next/link";

const AddButton = ({ path }: { path: string }) => {
  return (
    <Link href={path}>
      <button className='bg-appGreen active:scale-90 duration-100 rounded-full centralize  w-14 h-14 text-4xl shadow-md hover:opacity-70 hover:scale-105 shadow-slate-500'>
        +
      </button>
    </Link>
  );
};

export default AddButton;
