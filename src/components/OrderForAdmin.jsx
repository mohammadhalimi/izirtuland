'use client'

import { useState, useEffect } from "react";
import moment from "jalali-moment";

const OrderForAdmin = () => {
  const [userData, setUserData] = useState(null);
  const [orderData, setOrderData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [searchTrackId, setSearchTrackId] = useState("");

  useEffect(() => {
    fetch('http://localhost:3000/pages/api/infouser')
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch('http://localhost:3000/pages/api/saveorder')
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg text-blue-500">در حال بارگذاری...</div>
      </div>
    );
  }

  if (!userData || !orderData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg text-red-500">خطا در دریافت داده‌ها</div>
      </div>
    );
  }

  const filteredOrders = searchTrackId
    ? orderData.filter(order => order.trackId.includes(searchTrackId))
    : orderData;

  const matchedData = userData.map(user => {
    const ordersForUser = filteredOrders.filter(order => order.userPhone === user.numberPhone);
    if (ordersForUser.length > 0) {
      return {
        user: user,
        orders: ordersForUser
      };
    }
    return null;
  }).filter(item => item !== null);

  const convertToJalali = (date) => {
    return moment(date).locale('fa').format('YYYY/MM/DD');
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-primaryDemibold text-center mb-6 text-gray-700">
        لیست کاربران و سفارشات مربوطه
      </h1>
      <div className="mb-6">
        <input
          type="text"
          placeholder="جستجو با کد رهگیری"
          value={searchTrackId}
          onChange={(e) => setSearchTrackId(e.target.value)}
          className="w-full border border-gray-300 px-4 py-2 rounded-lg shadow focus:outline-none focus:ring focus:ring-blue-300 font-primaryMedium"
        />
      </div>

      {matchedData.length === 0 ? (
        <div className="text-center text-gray-500 font-primaryRegular">هیچ کاربری با سفارشات مرتبط پیدا نشد.</div>
      ) : (
        matchedData.map(({ user, orders }, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg shadow-md p-4 mb-6 bg-white"
          >
            <h2 className="text-xl font-primaryMedium text-gray-700 mb-3">
              اطلاعات کاربر
            </h2>
            <p className="font-primaryDemibold"><span >نام:</span> {user.firstname} {user.lastname}</p>
            <p className="font-primaryDemibold"><span>شماره تلفن:</span> {user.numberPhone}</p>
            <p className="font-primaryDemibold"><span>آدرس:</span> {user.address}</p>
            <p className="font-primaryDemibold"><span>تاریخ ثبت:</span> {convertToJalali(user.createdAt)}</p>

            <h3 className="text-lg font-primaryMedium text-gray-700 mt-4 mb-2">
              سفارشات
            </h3>
            {orders.map((order, orderIndex) => (
              <div
                key={orderIndex}
                className="border-t border-gray-300 pt-3 mt-3 space-y-2"
              >
                <p className="font-primaryDemibold">
                  <span>شماره پیگیری:</span> {order.trackId}
                </p>
                <p className="font-primaryDemibold">
                  <span>مجموع مبلغ:</span> {order.totalAmount} تومان
                </p>
                <p className="font-primaryDemibold">
                  <span>تاریخ ثبت سفارش:</span> {convertToJalali(order.createdAt)}
                </p>
                <div>
                  <h4 className="font-primaryMedium">محصولات:</h4>
                  {order.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="bg-gray-100 p-3 rounded mb-2"
                    >
                      <p className="font-primaryDemibold"><span>عنوان محصول:</span> {item.title}</p>
                      <p className="font-primaryDemibold"><span>تعداد:</span> {item.quantity}</p>
                      <p className="font-primaryDemibold"><span>قیمت واحد:</span> {item.price} تومان</p>
                      <p className="font-primaryDemibold"><span>مجموع قیمت:</span> {item.totalPrice} تومان</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default OrderForAdmin;
