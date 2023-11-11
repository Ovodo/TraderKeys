import React from "react";
import ArticleItem from "@/components/ArticleItem";
import { Article } from "@/lib/types";

const fetchNews = async () => {
  try {
    const res = await fetch(
      "https://cryptocurrency-news2.p.rapidapi.com/v1/coindesk",
      {
        headers: {
          "X-RapidAPI-Key": process.env.NEWS_API as string,
          "X-RapidAPI-Host": process.env.NEWS_HOST as string,
        },
      }
    );
    const res2 = await fetch(
      "https://cryptocurrency-news2.p.rapidapi.com/v1/cointelegraph",
      {
        headers: {
          "X-RapidAPI-Key": process.env.NEWS_API as string,
          "X-RapidAPI-Host": process.env.NEWS_HOST as string,
        },
      }
    );

    const data = await res.json();
    const data2 = await res2.json();
    console.log("data", data);
    console.log("data2", data2);
    return (data.data as Article[])?.concat(data2.data);
  } catch (error) {
    console.error(error);
  }
};

const Page = async () => {
  const feed: Article[] = (await fetchNews()) as Article[];
  console.log("feed", feed);

  return (
    <main className='flex max-h-screen overflow-scroll scrollbar-hide relative bg-gradient-to-b from-appRed to-appYellow flex-col items-center justify-start px-10 py-5'>
      <section
        id='TOP'
        className='w-full mb-10 border-b mt-10 pb-1 flex border-appBlue justify-around'
      >
        <h4 className='text-2xl text-appBlue font-semibold'>
          Latest and Trending News
        </h4>
      </section>

      {feed
        .filter((article) => article?.description?.length > 10)
        .map((article, index) => {
          return <ArticleItem key={index.toString()} article={article} />;
        })}
    </main>
  );
};

export default Page;
