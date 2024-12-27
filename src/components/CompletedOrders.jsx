'use client'
import { useEffect, useState } from "react";
import moment from "jalali-moment";

const CompletedOrders = () => {
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUserPhone, setCurrentUserPhone] = useState("");

  useEffect(() => {
    const phoneNumber = window.location.pathname.split('/').pop();
    setCurrentUserPhone(phoneNumber);
  }, []);

  useEffect(() => {
    fetch('https://izirtuland.liara.run/pages/api/saveorder')
      .then((res) => res.json())
      .then((data) => {
        setOrderData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const convertToJalali = (date) => {
      return moment(date).locale('fa').format('YYYY/MM/DD');
    };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-blue-500 text-lg">در حال بارگذاری...</p>
      </div>
    );
  }

  const filteredOrders = orderData.filter(order => order.userPhone === currentUserPhone);

  return (
    <div className="max-w-4xl mx-auto p-4" dir="rtl">
      <h1 className="text-2xl font-primaryDemibold text-center mb-6 text-gray-700">
        سفارشات تکمیل شده
      </h1>
      {filteredOrders.length === 0 ? (
        <p className="text-center text-gray-500">سفارشی مرتبط با این شماره تلفن یافت نشد.</p>
      ) : (
        filteredOrders.map((order, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg shadow-md p-4 mb-6 bg-white"
          >
            <h2 className="text-lg font-primaryMedium text-gray-700 mb-3">
              شماره پیگیری: {order.trackId}
            </h2>
            <p className="font-primaryDemibold">
              <span>مبلغ کل سفارش:</span> {order.totalAmount} تومان
            </p>
            <p className="font-primaryDemibold">
              <span>تاریخ ثبت سفارش:</span> {convertToJalali(order.createdAt)}
            </p>
            <h3 className="font-primaryMedium text-gray-700 mt-4 mb-2">محصولات سفارش:</h3>
            {order.items.map((item, itemIndex) => (
              <div
                key={itemIndex}
                className="bg-gray-100 p-3 rounded mb-2"
              >
                <p className="font-primaryDemibold"><span>عنوان محصول:</span> {item.title}</p>
                <p className="font-primaryDemibold"><span>برند:</span> {item.brand}</p>
                <p className="font-primaryDemibold"><span>تعداد:</span> {item.quantity}</p>
                <p className="font-primaryDemibold"><span>قیمت واحد:</span> {item.price} تومان</p>
                <p className="font-primaryDemibold"><span>مجموع قیمت:</span> {item.totalPrice} تومان</p>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default CompletedOrders;
