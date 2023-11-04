"use client";
import React, { useState } from "react";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

const SearchComponent = () => {
  const [val, setVal] = useState("");

  return (
    <div className=' w-[100%]  space-x-3 px-2 py-2 bg-[#f2f2f2] flex items-center justify-start rounded-md'>
      <MagnifyingGlassIcon style={{ fontSize: 20, color: "#aab2c8" }} />
      <input
        placeholder='Search'
        style={{ fontSize: 16, fontFamily: "Poppins-SemiBold" }}
        value={val}
        className='bg-transparent outline-none text-[#aab2c8]'
        onChange={(e) => {
          setVal(e.target.value);
        }}
        type='text'
      />
    </div>
  );
};

export default SearchComponent;
