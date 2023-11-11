"use client";
import React from "react";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useAppDispatch } from "@/redux/hooks";
import { setText } from "@/redux/features/userSlice";

const SearchComponent = () => {
  const dispatch = useAppDispatch();
  return (
    <div className=' w-[100%]  space-x-3 px-2 py-2 bg-[#f2f2f2] flex items-center justify-start rounded-md'>
      <MagnifyingGlassIcon style={{ fontSize: 20, color: "#aab2c8" }} />
      <input
        name='search'
        placeholder='Search'
        className='bg-transparent outline-none text-[#aab2c8]'
        onChange={(e) => dispatch(setText(e.target.value))}
        type='text'
      />
      {/* <p>{text}</p> */}
    </div>
  );
};

export default SearchComponent;
