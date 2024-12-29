"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Err from "app/not-found";

const FooterMobile = () => {
    const [data, setData] = useState(null);
    const [da, setDa] = useState(null);
    const location = usePathname();

    const updateCartData = () => {
        const savedData = localStorage.getItem('cart');
        if (savedData) {
            setDa(JSON.parse(savedData));
        } else {
            setDa(null);
        }
    };

    useEffect(() => {
        updateCartData();
    }, []);

    useEffect(() => {
        fetch('https://izirtuland.ir/pages/api/footermb')
            .then((res) => res.json())
            .then((data) => {
                setData(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    useEffect(() => {
        const handleStorageUpdate = () => {
            updateCartData();
        };

        window.addEventListener("storageUpdate", handleStorageUpdate);

        return () => {
            window.removeEventListener("storageUpdate", handleStorageUpdate);
        };
    }, []);

    if (!data) return <Err />;

    return (
        <div className="grid grid-cols-4 fixed bottom-0 left-0 right-0 bg-white justify-center lg:hidden z-20 p-2 border-t-2" dir="rtl">
            {data.map((items) =>
                items.footmb.map((item) => (
                    <Link href={`${item.link}`} key={item.id}>
                        <div className={`flex flex-col items-center relative`}>
                            {item.id === 2 && (
                                <p className="absolute top-0 right-5 sm:10 md:right-16 lg:20 bg-red-500 text-white rounded-full px-2 text-xs font-bold mx-auto">
                                    {Array.isArray(da) && da.length}
                                </p>
                            )}
                            <div
                                className={`${
                                    location === item.link ||
                                    (item.id === 3 && location.startsWith('/userpanel')) ||
                                    (item.id === 1 && location.startsWith('/products'))
                                        ? "bg-gray-300 rounded p-1"
                                        : ""
                                }`}
                                dangerouslySetInnerHTML={{ __html: item.svg }}
                            />
                            <p className="text-color2 font-primaryRegular">{item.text}</p>
                        </div>
                    </Link>
                ))
            )}
        </div>
    );
};

export default FooterMobile;
