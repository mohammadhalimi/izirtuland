'use client'
import { useState,useEffect } from "react";
import Image from "next/image";
import Link from "next/link";



const BuyEmpty = () => {
 const [data , setData] = useState(null);
 const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        fetch('https://izirtuland.ir/pages/api/buy')
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
            <div className="max-w-screen-xl flex flex-wrap justify-center mx-auto p-2 my-4 h-screen">
                <div className="max-w-md w-full bg-white shadow-md rounded-lg p-6">
                    <div className="w-3/4 h-8 animate-pulse bg-gray-400 mx-auto rounded-lg"></div>
                    <div className="w-2/4 h-8 animate-pulse bg-gray-400 mx-auto rounded-lg mt-4"></div>
                    <div className="w-3/4 h-2/4 animate-pulse bg-gray-400 mx-auto rounded-lg mt-16"></div>
                    <div className="w-2/4 h-8 animate-pulse bg-blue-400 mx-auto rounded-lg mt-4"></div>
                </div>
            </div>
        );
    }

    if (!data) return <p></p>;
    
    return (
        <div className="max-w-screen-xl flex flex-wrap justify-center mx-auto p-2 my-4 h-screen">
            <div className="max-w-md w-full bg-white shadow-md rounded-lg p-6 text-center">
                {data.map((item, index) => (
                    <div key={index}>
                        <h1 className="text-2xl font-primaryBold mb-4 text-gray-800">{item.title}</h1>
                        <p className="text-gray-600 font-primaryRegular mb-6">{item.text}</p>
                        <Image src={item.pic} alt="Empty Cart" width={200} height={200} className="mx-auto mb-4 object-cover" layout="responsive" />
                        <Link href={item.link} className="mt-4 inline-block bg-blue-500 text-white font-primaryMedium py-2 px-4 rounded hover:bg-blue-600 transition duration-300">
                            {item.look}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default BuyEmpty;