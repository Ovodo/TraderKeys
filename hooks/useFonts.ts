import { Jim_Nightshade, Jura, Jacques_Francois } from "next/font/google";

const julius = Jura({ weight: "400", subsets: ["latin"] });
const Jim = Jim_Nightshade({ weight: "400", subsets: ["latin"] });
const agba = Jacques_Francois({ weight: "400", subsets: ["latin"] });

const useFonts = () => {
  return { Jim, julius, agba };
};

export default useFonts;
