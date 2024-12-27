'use client';

import { useEffect, useState } from "react";
import Link from "next/link";

const LogoBuy = () => {
    const [da, setDa] = useState([]); // مقدار اولیه آرایه خالی

    // تابع برای دریافت داده‌های cart از localStorage
    const fetchCartData = () => {
        const savedData = localStorage.getItem('cart');
        return savedData ? JSON.parse(savedData) : [];
    };

    useEffect(() => {
        setDa(fetchCartData()); // داده‌ها را از localStorage می‌خوانیم
    }, []); // اجرای useEffect تنها در بارگذاری اول

    useEffect(() => {
        const handleStorageUpdate = () => {
            setDa(fetchCartData()); // بروزرسانی داده‌ها از localStorage
        };

        window.addEventListener("storageUpdate", handleStorageUpdate);

        return () => {
            window.removeEventListener("storageUpdate", handleStorageUpdate);
        };
    }, []); // آرایه وابستگی خالی، چون وابستگی به `fetchCartData` استاتیک است

    return (
        <Link href="/buy" className="ms-4 relative border-r-2 p-2 lg:block hidden" aria-label="link for page shop">
            <p className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 text-xs font-bold">
                {da.length} {/* نمایش تعداد محصولات در سبد خرید */}
            </p>
            <svg
                className="hover:fill-blue-500 transition duration-200"
                xmlns="https://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                id="Shopping-Cart-1--Streamline-Ultimate"
                height="36"
                width="36"
            >
                <path
                    stroke="#000000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.7284 19.8382H16.0989C16.4693 19.8383 16.8277 19.7072 17.1108 19.4682C17.3937 19.2292 17.5829 18.8978 17.6449 18.5326L20.4014 2.3303C20.4636 1.9654 20.6529 1.6342 20.9359 1.3954C21.2188 1.1566 21.5772 1.0257 21.9474 1.0258H22.976"
                    strokeWidth="1.5"
                ></path>
                <path
                    stroke="#000000"
                    d="M7.6883 22.9742C7.4719 22.9742 7.2964 22.7987 7.2964 22.5822S7.4719 22.1903 7.6883 22.1903"
                    strokeWidth="1.5"
                ></path>
                <path
                    stroke="#000000"
                    d="M7.6883 22.9742C7.9048 22.9742 8.0803 22.7987 8.0803 22.5822S7.9048 22.1903 7.6883 22.1903"
                    strokeWidth="1.5"
                ></path>
                <path
                    stroke="#000000"
                    d="M15.5282 22.9742C15.3117 22.9742 15.1362 22.7987 15.1362 22.5822S15.3117 22.1903 15.5282 22.1903"
                    strokeWidth="1.5"
                ></path>
                <path
                    stroke="#000000"
                    d="M15.5282 22.9742C15.7447 22.9742 15.9202 22.7987 15.9202 22.5822S15.7447 22.1903 15.5282 22.1903"
                    strokeWidth="1.5"
                ></path>
                <path
                    stroke="#000000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18.2229 15.1345H5.605C4.9057 15.1344 4.2266 14.9007 3.6754 14.4703C3.1243 14.0401 2.7328 13.4379 2.5631 12.7596L1.0474 6.6967C1.0185 6.5811 1.0163 6.4604 1.041 6.3438C1.0658 6.2272 1.1167 6.1178 1.1901 6.0239C1.2635 5.93 1.3573 5.854 1.4644 5.8018C1.5716 5.7496 1.6892 5.7224 1.8084 5.7225H19.8233"
                    strokeWidth="1.5"
                ></path>
            </svg>
        </Link>
    );
};

export default LogoBuy;
