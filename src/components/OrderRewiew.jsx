'use client'
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from 'axios';

const OrderRewiew = () => {
    const [data, setData] = useState(null);
    const [totalAmount, setTotalAmount] = useState(0);
    const [Loading, setLoading] = useState(true);
    const route = useRouter();

    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const phoneNumber = window.location.pathname.split('/').pop();
        setCurrentUser(phoneNumber);
    }, []);

    useEffect(() => {
        const savedData = localStorage.getItem('final');
        if (savedData) {
            const parsedData = JSON.parse(savedData);
            setData(parsedData);

            const total = Array.isArray(parsedData.items)
                ? parsedData.items.reduce((sum, item) => {
                    const priceWithoutComma = item.totalPrice.replace(/,/g, '');
                    return sum + parseFloat(priceWithoutComma);
                }, 0)
                : 0;

            setTotalAmount(total);
            const finalBuyData = {
                ...parsedData,
                userPhone: currentUser,
            };
            localStorage.setItem('final-buy', JSON.stringify(finalBuyData));
        }
    }, [currentUser]);


    const initiatePayment = async () => {
        localStorage.setItem('final', JSON.stringify([]));
        setData([]);
        setLoading(true);
        try {
            const response = await axios.post('/pages/api/payment', {
                amount: totalAmount * 10
            });

            if (response.data.paymentUrl) {
                route.push(response.data.paymentUrl);
            } else {
                alert('Error initiating payment: ' + response.data.error);
            }
        } catch (error) {
            alert('An error occurred while initiating the payment.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full font-primaryMedium mb-4 p-4 h-screen" dir="rtl">
            {data && Array.isArray(data.items) ? (
                data.items.map((item) => (
                    <div key={item.id}>
                        <p className="text-red-500"><strong>نام محصول:</strong> {item.title}</p>
                        {(item.title.includes("مایع") ?
                            <p className="mb-2 font-primaryLight md:font-primaryRegular text-gray-900">بسته {item.package} لیتری</p>
                            :
                            <p className="mb-2 font-primaryLight md:font-primaryRegular text-gray-900"><strong>بسته :</strong>{item.package} کیلویی</p>
                        )}
                        <span className={`text-xs font-medium md:font-bold me-2 px-2.5 py-0.5 rounded border ${item.brand.includes('KHAK SHIMI') ? 'bg-yellow-100 text-yellow-800 border-yellow-400' : 'bg-green-100 text-green-800 border-green-400'}`}>
                            {item.brand}
                        </span>
                        <p><strong>تعداد:</strong> {item.quantity}</p>
                        <p><strong>قیمت واحد:</strong> {item.price} تومان</p>
                        <p><strong>قیمت کل:</strong> {item.totalPrice} تومان</p>
                    </div>
                ))
            ) : (
                <p>داده‌ای وجود ندارد.</p>
            )}
            {totalAmount > 0 && (
                <div>
                    <p><strong>جمع کل:</strong> {totalAmount.toLocaleString()} تومان</p>
                    <button onClick={initiatePayment} className="p-2 bg-green-500 font-primaryMedium rounded-lg border-2 border-green-500 text-white hover:bg-white hover:text-green-500 mt-2">
                        {Loading ? "پرداخت نهایی" : "در حال اتصال به درگاه پرداخت"}
                    </button>
                </div>
            )}
        </div>
    );
}

export default OrderRewiew;
