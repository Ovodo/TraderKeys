import React from "react";

type Props = {
  placeholder: string;
  styles?: string;
  value: number | string | undefined;
};

const InputLine = ({ placeholder, styles, value }: Props) => {
  // --------------------------------------------VARIABLES

  //-----------------------------------------------------------FUNCTIONS

  //------------------------------------------------------------------USE EFFECTS
  return (
    <input
      type='text'
      readOnly
      value={value}
      placeholder={placeholder}
      className={`border-b-2 ${styles} pb-2 my-[20px] md:my-[10px] border-gray-400 focus:outline-none focus:border-b-2 focus:border-binance_green px-2 py-1`}
    />
  );
};

export default React.memo(InputLine);
