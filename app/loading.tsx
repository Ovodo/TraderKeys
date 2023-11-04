import { ActivityLogIcon } from "@radix-ui/react-icons";
import React from "react";

const Loading = () => {
  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <p>Loading...🔃</p>
      <ActivityLogIcon />
    </div>
  );
};

export default Loading;
