"use client";
import AddButton from "@/components/button/AddButton";
import InitModal from "@/components/modals/InitModal";
import Copy from "@/components/utils/Copy";
import { ActivityLogIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import React from "react";
import Key from "@/public/key.svg";
import useFonts from "@/hooks/useFonts";
import { motion } from "framer-motion";

const Loading = () => {
  const { Jim } = useFonts();

  return (
    <main className='flex min-h-screen overflow-hidden relative bg-gradient-to-b from-appRed to-appYellow flex-col items-center justify-center p-24'>
      <motion.h1
        initial={{ x: -1000 }}
        animate={{ x: 1000 }}
        transition={{
          duration: 10,
          type: "tween",
          repeat: 5,
          repeatType: "mirror",
        }}
        style={Jim.style}
        className='text-appBlue text-[150px]  leading-[225px]'
      >
        Trader Keys
      </motion.h1>
      <div className='animate-pulse absolute top-2 left-2 opacity-50 max-w-max max-h-max bg-white rounded-full'>
        <AddButton path='/' />
      </div>
      <div className='animate-pulse absolute top-2 right-2 opacity-50 max-w-max max-h-max bg-white rounded-full'>
        <AddButton path='/' />
      </div>
      <div className='animate-pulse absolute bottom-2 right-2 opacity-50 max-w-max max-h-max bg-white rounded-full'>
        <AddButton path='/' />
      </div>
      <div className='animate-pulse absolute bottom-2 left-2 opacity-50 max-w-max max-h-max bg-white rounded-full'>
        <AddButton path='/' />
      </div>
    </main>
  );
};

export default Loading;
