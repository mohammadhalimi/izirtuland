'use client';

import { useState, useEffect } from "react";
import Err from "app/not-found";
import Image from "next/image";
import Link from "next/link";
import Search from "./searchbar";

const ListFertilizer = () => {
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        searchQuery: "",
        package: "",
        type: "",
        brand: ""
    });

    useEffect(() => {
        fetch('https://izirtuland.liara.run/pages/api/listfertilizer')
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
            <div className="container">
                <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4">
                    {Array.from({ length: 12 }).map((_, index) => (
                        <div key={index} className="relative flex flex-col my-6 bg-white shadow-lg border border-gray-300 rounded-lg w-full p-4">
                            <div className="h-40 bg-gray-200 animate-pulse rounded-md"></div>
                            <div className="p-3">
                                <div className="h-6 bg-gray-200 animate-pulse rounded mb-2"></div>
                                <div className="h-4 bg-gray-200 animate-pulse rounded mb-2"></div>
                                <div className="h-4 bg-gray-200 animate-pulse rounded mb-2"></div>
                                <div className="h-4 bg-gray-200 animate-pulse rounded mb-2 w-1/2"></div>
                                <div className="h-6 bg-gray-200 animate-pulse rounded mt-2"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
    if (!data) return <Err />;

    const filteredData = data.filter((item) => {
        const searchWords = filters.searchQuery.split(" ").filter(Boolean);
        const matchesSearch = searchWords.every((word) => item.name.includes(word));
        const matchesPackage = filters.package ? item.package === filters.package : true;
        const matchesType = filters.type ? (filters.type === "مایع" ? item.name.includes("مایع") : !item.name.includes("مایع")) : true;
        const matchesBrand = filters.brand ? item.brand.includes(filters.brand) : true;

        return matchesSearch && matchesPackage && matchesType && matchesBrand;
    });

    const handleFilterChange = (key, value) => {
        setFilters((prev) => ({
            ...prev,
            [key]: value
        }));
    };

    return (
        <div className="container" dir="rtl">
            <div className="mb-4 w-full">
                <Search onChange={(e) => handleFilterChange("searchQuery", e.target.value)} value={filters.searchQuery} />
            </div>
            <div className="mb-4 w-full grid md:grid-cols-4 lg:grid-cols-6 grid-cols-2 gap-2 font-primaryRegular">
                {["بسته ۱ کیلویی", "بسته ۱۰ کیلویی", "بسته ۱ لیتری", "بسته ۲۰ لیتری"].map((pkg) => (
                    <button
                        key={pkg}
                        onClick={() => handleFilterChange("package", pkg)}
                        className={`py-2 px-4 rounded ${filters.package === pkg ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}
                    >
                        {pkg}
                    </button>
                ))}
                {["جامد", "مایع"].map((type) => (
                    <button
                        key={type}
                        onClick={() => handleFilterChange("type", type)}
                        className={`py-2 px-4 rounded ${filters.type === type ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}
                    >
                        {type}
                    </button>
                ))}
                {["KHAK SHIMI", "IZIRTU LAND"].map((brand) => (
                    <button
                        key={brand}
                        onClick={() => handleFilterChange("brand", brand)}
                        className={`py-2 px-4 rounded ${filters.brand === brand ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}
                    >
                        {brand}
                    </button>
                ))}
                <button
                    onClick={() => setFilters({ searchQuery: "", package: "", type: "", brand: "" })}
                    className="py-2 px-4 rounded bg-red-500 text-white"
                >
                    حذف فیلترها
                </button>
            </div>
            {filteredData.length > 0 ? (
                <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4">
                    {filteredData.map((item) => (
                        <Link href={`${item.link}`} key={item.id}>
                            <div className="relative flex flex-col my-6 bg-white shadow-lg border border-gray-300 rounded-lg w-full duration-300 hover:scale-105">
                                <Image
                                    src={item.pic}
                                    layout="responsive"
                                    height={200}
                                    width={150}
                                    alt="product"
                                    className="relative w-full h-1/4 object-cover rounded-md p-4"
                                />
                                <div className="p-3">
                                    <h1 className="mb-1 text-md text-gray-900 md:font-primaryDemibold font-primaryRegular truncate text-right" dir="ltr">
                                        {item.name}
                                    </h1>
                                    <p className="mb-2 text-left font-primaryLight md:font-primaryRegular text-gray-700">{item.price} تومان</p>
                                    <p className="mb-2 font-primaryLight md:font-primaryRegular text-gray-900">{item.package}</p>
                                    <span className={`text-xs font-medium md:font-bold me-2 px-2.5 py-0.5 rounded border ${item.brand.includes('KHAK SHIMI') ? 'bg-yellow-100 text-yellow-800 border-yellow-400' : 'bg-green-100 text-green-800 border-green-400'}`}>
                                        {item.brand}
                                    </span>
                                    <p className="hidden">
                                        {item.id}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500 my-10">نتیجه‌ای برای جستجوی شما یافت نشد.</p>
            )}
        </div>
    );
}

export default ListFertilizer;


