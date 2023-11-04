import { getAccountt, getAptosBalance } from "@/lib/contract";

const Copy = ({ content }: { content: string }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='h-6 w-6 scale-50 shadow-md shadow-slate-700 active:translate-y-1 hover:cursor-pointer'
      fill='none'
      viewBox='0 0 24 24'
      stroke='white'
      strokeWidth={2}
      //   onClick={() => navigator.clipboard.writeText(content)}
      onClick={async () => console.log(await getAccountt(content))}
      // onClick={() => console.log(content)}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3'
      />
    </svg>
  );
};

export default Copy;
