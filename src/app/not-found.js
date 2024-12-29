'use client'

import Link from "next/link";
import { useState, useEffect } from "react";
export const metadata = {
  title: "صفحه ۴۰۴",
  description: "خطای ۴۰۴ صفحه مورد نظر وجود ندارد."
};


const Err = () => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://izirtuland.ir/pages/api/not-found')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);


  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="text-center space-y-4 w-1/4 content-center">
          <div className="p-10 bg-white rounded-lg shadow-xl max-w-2xl mx-auto animate-pulse content-center">
            <div className="h-10 bg-red-500 rounded w-3/4 mb-4 mx-auto"></div>
            <div className="h-6 bg-gray-300 rounded w-1/2 mb-4 mx-auto" ></div>
            <div className="h-10 bg-blue-600 rounded px-8 w-1/4 mx-auto"></div>
          </div>
        </div>
      </div>
    )
  };
  if (!data) return <p></p>;

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="text-center space-y-4">
          {
            data.map((it) => (
              <div key={it.id} className="p-10 bg-white rounded-lg shadow-xl max-w-2xl mx-auto">
                <h1 className="text-5xl font-primaryBold text-red-500">{it.err}</h1>
                <p className="text-2xl text-gray-700 mt-4 font-primaryDemibold">{it.text}</p>
                <Link href="/" className="inline-block mt-6 px-8 py-3 text-white bg-color2 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out font-primaryMedium">
                  {it.link}
                </Link>
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}
export default Err;