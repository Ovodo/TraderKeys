import { Inter, Jim_Nightshade, Jura } from "next/font/google";
import React from "react";

const inter = Inter({ subsets: ["latin"] });
const julius = Jura({ weight: "400", subsets: ["latin"] });
const Jim = Jim_Nightshade({ weight: "400", subsets: ["latin"] });
const useFonts = () => {
  return { Jim, julius };
};

export default useFonts;
