'use client'
import Image from "next/image";
import { useEffect, useState } from "react";
import Err from "app/not-found";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Load = () => {
    return (
        <div className='max-w-screen-xl flex flex-wrap justify-center mx-auto p-4 my-4' dir='rtl'>
            <div className="w-full mb-6">
                <Skeleton height={30} width="60%" className="mb-4" />
                <div className="flex flex-col items-center justify-center md:flex-row">
                    <Skeleton height={300} width={200} className="rounded shadow-md mb-4" />
                    <Skeleton height={300} width={600} className="rounded shadow-md mb-4" />
                </div>
                <Skeleton height={20} width="80%" className="mb-2" />
                <Skeleton height={20} width="40%" className="mb-2" />
                <Skeleton height={20} width="30%" className="mb-2" />
                <Skeleton height={25} width="50%" className="mb-2" />
            </div>
        </div>
    )
}



const Product = ({ params }) => {
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(true);

    const handleBuy = async (product) => {
        try {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            const existingProductIndex = cart.findIndex(item => item.id === product.id);

            if (existingProductIndex === -1) {
                cart.push(product);
                localStorage.setItem('cart', JSON.stringify(cart));
                alert('محصول با موفقیت به لیست خرید اضافه شد!');
                window.dispatchEvent(new Event("storageUpdate"));
            } else {
                alert('محصول قبلا به سبد خرید اضافه شده است.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('خطایی در ارتباط با سرور رخ داده است.');
        }
        
    };
    useEffect(() => {
        fetch('https://izirtuland.ir/pages/api/pageproduct')
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


    if (isLoading) return <Load />;
    if (!data) return <Err />;

    return (
        <div className='max-w-screen-xl flex flex-wrap justify-center mx-auto p-4 my-4' dir='rtl'>
            {data.map((item) => (
                <div className="w-full" key={item.id} dir="rtl">
                    {item.id === parseInt(params.productId) && (
                        <>
                            <h1 className="text-2xl font-primaryDemibold mb-6 text-right" dir="ltr">{item.title}</h1>
                            <div className="flex flex-col items-center justify-center md:flex-row">
                                <Image
                                    height={300}
                                    width={200}
                                    src={item.pic}
                                    alt='logo'
                                    className='w-[200px] h-[300px] rounded shadow-md mb-4'
                                />
                                <Image
                                    height={300}
                                    width={600}
                                    src={item.table}
                                    alt='logo'
                                    className='md:w-[600px] md:h-[300px] w-[450px] h-[250px] rounded shadow-md'
                                />
                            </div>
                            <p className="mb-2 font-primaryLight md:font-primaryRegular mt-2 p-2 w-fit rounded text-justify whitespace-pre-line">{item.text}</p>
                            {
                                (item.title.includes("مایع")
                                    ?
                                    <p className="mb-2 font-primaryLight md:font-primaryRegular text-gray-900">بسته {item.package} لیتری</p>
                                    :
                                    <p className="mb-2 font-primaryLight md:font-primaryRegular text-gray-900">بسته{item.package} کیلویی</p>
                                )
                            }
                            <p className="mb-2 font-primaryLight md:font-primaryRegular text-gray-700">{item.price} تومان</p>
                            {item.brand.includes('KHAK SHIMI') ? (
                                <span className="bg-yellow-100 text-yellow-800 text-xs font-medium md:font-bold me-2 px-2.5 py-0.5 rounded border border-yellow-400">
                                    {item.brand}
                                </span>
                            ) : (
                                <span className="bg-green-100 text-green-800 text-xs font-medium md:font-bold me-2 px-2.5 py-0.5 rounded border border-green-400">
                                    {item.brand}
                                </span>
                            )}
                            <p className="mb-2 font-primaryLight md:font-primaryRegular bg-blue-100 text-blue-800 mt-2 p-2 w-fit rounded cursor-pointer" onClick={() => handleBuy(item)}>{item.buy}</p>
                            <p className="hidden">
                                {item.id}
                            </p>
                        </>
                    )}
                </div>
            ))}
        </div>
    )
}

export default Product;