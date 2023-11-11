import { Article } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ArticleItem = ({ article }: { article: Article }) => {
  return (
    <div className='w-[95%] my-5 relative shadow-sm shadow-appBlue bg-appCream p-5 h-[400px] space-x-10 rounded-sm flex border-black'>
      {/* <Link className='cursor-pointer' href={article.url}> */}
      <Image
        className='rounded-sm h-auto'
        width={250}
        height={250}
        alt='article_image'
        src={article.thumbnail}
      />
      {/* </Link> */}
      <div className='flex w-full text-black relative items-center flex-col'>
        <Link className='cursor-pointer' href={article.url}>
          <h4 className='font-bold underline text-xl'>{article.title} </h4>
        </Link>
        <p className='mt-2'>{article.description}</p>
      </div>
      <p className='absolute font-semibold bottom-4 right-4'>{`Published:${article.createdAt}`}</p>
    </div>
  );
};

export default ArticleItem;
