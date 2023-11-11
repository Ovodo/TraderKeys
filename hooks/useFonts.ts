import {
  Inter,
  Jim_Nightshade,
  Jura,
  Jacques_Francois,
} from "next/font/google";
import React from "react";

const inter = Inter({ subsets: ["latin"] });
const julius = Jura({ weight: "400", subsets: ["latin"] });
const Jim = Jim_Nightshade({ weight: "400", subsets: ["latin"] });
const agba = Jacques_Francois({ weight: "400", subsets: ["latin"] });

const useFonts = () => {
  return { Jim, julius, agba };
};

export default useFonts;
