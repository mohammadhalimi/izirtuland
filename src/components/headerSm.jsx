"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import Close from "./SVG/close";
import $ from "jquery";

const HeaderSm = ({ onClick }) => {
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const menuRef = useRef(null); 

    useEffect(() => {
        fetch('https://izirtuland.liara.run/pages/api/header')
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

    useEffect(() => {
        if (!isLoading && menuRef.current) {
            $(menuRef.current).hide().slideDown(300); 
        }
    }, [isLoading]);
    const handleClose = () => {
        $(menuRef.current).slideUp(300, onClick); 
    };

    if (isLoading) return <p></p>;
    if (!data) return <p>error</p>;

    return (
        <div
            ref={menuRef} 
            className={`w-1/2 z-10 top-0 right-0 md:block hidden transform transition-transform duration-300 ease-in-out bg-white h-screen drop-shadow fixed`}
            dir="rtl"
            style={{ display: 'none' }} 
        >
            <button
                type="button"
                onClick={handleClose}
                className="inline-flex items-center w-full h-12 justify-center bg-red-500 hover:bg-red-400"
            >
                <Close />
            </button>
            <ul className="font-primaryMedium p-4 md:p-0 border border-gray-100">
                {data.map((items) =>
                    items.headers.map((item) => (
                        <Link key={item.id} href={`${item.link}`} onClick={onClick}>
                            <li key={item.id} className="hover:text-white hover:bg-color2 p-4 rounded transition-colors duration-200">
                                {item.name}
                            </li>
                        </Link>
                    ))
                )}
            </ul>
        </div>
    );
};

export default HeaderSm;
