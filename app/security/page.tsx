import React from "react";
import { Session } from "next-auth";
import { getServerAuthSession } from "@/server/auth";
import Security from "@/components/Security";
import { baseUrl } from "@/config";
import { decrypt } from "@/lib/security";

const getPassword = async (item: string) => {
  const res = await fetch(`${baseUrl}/api/password/get/${item}`);
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary

    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  console.log("dataa", data);

  return data;
};

const Page = async () => {
  const session = (await getServerAuthSession()) as Session;
  const password = await getPassword(session.user.address);
  const privateKey = await decrypt(session.user.privateKey);

  return (
    <main className='flex min-h-screen  relative bg-gradient-to-b from-appRed to-appYellow flex-col items-center justify-start px-10 py-5'>
      <h4 className='text-2xl absolute bottom-3 left-2 text-appBlue font-semibold'>
        {`${session.user.name}`}
      </h4>
      <section
        id='TOP'
        className='w-full mb-10 border-b mt-5 pb-1 flex border-appBlue justify-around'
      >
        <h4 className='text-2xl  text-appBlue font-semibold'>
          Security and Privacy
        </h4>
      </section>
      <Security
        secret={password}
        privateKey={privateKey as string}
        user={session.user}
      />
    </main>
  );
};

export default Page;
