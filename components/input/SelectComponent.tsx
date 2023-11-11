import React, { useState } from "react";
import { motion } from "framer-motion";
import OutsideClickHandler from "react-outside-click-handler";

import { ArrowDownIcon } from "@radix-ui/react-icons";
import InputLine from "./InputLine";
import useFonts from "@/hooks/useFonts";
import Link from "next/link";

type Props = {
  placeholder: string;
  items: string[];
  updateFunction: (item?: string) => void;
  path: string;
};
const SelectComponent = ({
  items,
  placeholder,
  updateFunction,
  path,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(String);
  const { julius } = useFonts();
  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        setOpen(false);
      }}
    >
      <div
        style={julius.style}
        className='flex items-center   max-w-max relative'
      >
        {open && (
          <motion.div
            animate={{ width: ["0%", "100%"] }}
            className='w-full max-h-[550px] z-10 absolute border scrollbar-hide bg-appCream overflow-y-scroll'
          >
            {items?.map((item: any) => (
              <Link key={item} href={`${path}${item}`}>
                <p
                  onClick={() => {
                    setValue(item);
                    setOpen(false);
                    updateFunction(item);
                  }}
                  style={{ fontSize: 14 }}
                  className='regular pl-3 font-semibold hover:bg-appOrange hover:bg-opacity-70 hover:scale-105 duration-300 hover:cursor-pointer  hover:opacity-70 border-b py-2 mb-2 px-2 text-appBlue'
                >
                  {item}
                </p>
              </Link>
            ))}
          </motion.div>
        )}
        <InputLine
          value={value}
          styles={"bg-transparent font-semibold  mr-2  text-[16px]"}
          placeholder={placeholder}
        />
        <div
          onClick={() => {
            setOpen(!open);
          }}
          className={`absolute ${
            open ? "rotate-180 z-20" : "rotate-0"
          } duration-200 right-[2px] self-center`}
        >
          <ArrowDownIcon
            style={{
              fontSize: 24,
              cursor: "pointer",
              color: "#aab2c8",
            }}
          />
        </div>
      </div>
    </OutsideClickHandler>
  );
};

export default React.memo(SelectComponent);
