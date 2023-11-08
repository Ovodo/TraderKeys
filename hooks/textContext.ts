// import React, { createContext, useContext, useState } from "react";

// interface TextInputContextProps {
//   textInput: string;
//   setTextInput: (text: string) => void;
// }

// const TextInputContext = createContext<TextInputContextProps | undefined>(
//   undefined
// );

// export const TextInputProvider = ({
//   children,
// }: {
//   children: React.ReactNode;
// }) => {
//   const [textInput, setTextInput] = useState("");

//   return (
//     <TextInputContext.Provider value={{ textInput, setTextInput }}>

//     </TextInputContext.Provider>
//   );
// };

// export const useTextInput = (): TextInputContextProps => {
//   const context = useContext(TextInputContext);

//   if (context === undefined) {
//     throw new Error("useTextInput must be used within a TextInputProvider");
//   }

//   return context;
// };
