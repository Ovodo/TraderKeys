"use client";
import React, { useState } from "react";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useAppDispatch } from "@/redux/hooks";
import { setText } from "@/redux/features/userSlice";
import { useRouter } from "next/navigation";

const SearchComponent = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  // const [text, setText] = useState("");
  return (
    <div className=' w-[100%]  space-x-3 px-2 py-2 bg-[#f2f2f2] flex items-center justify-start rounded-md'>
      <MagnifyingGlassIcon style={{ fontSize: 20, color: "#aab2c8" }} />
      <input
        name='search'
        placeholder='Search'
        // onFocus={() => router.replace(`/accounts${text}`)}
        style={{ fontSize: 16, fontFamily: "Poppins-SemiBold" }}
        // value={val}
        className='bg-transparent outline-none text-[#aab2c8]'
        onChange={(e) => dispatch(setText(e.target.value))}
        type='text'
      />
      {/* <p>{text}</p> */}
    </div>
  );
};

export default SearchComponent;
