'use client';
import { useState, useEffect } from "react";

const UserPanel = () => {
    const [info, setInfo] = useState({ firstname: "", lastname: "", numberPhone: "", address: "", _id: "" });
    const [editingUserInfo, setEditingUserInfo] = useState(null);
    const [data, setData] = useState(null);
    const [isSaved, setIsSaved] = useState(false);
    const [da, setDa] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [phoneError, setPhoneError] = useState("");

    useEffect(() => {
        const phoneNumber = window.location.pathname.split('/').pop();
        setCurrentUser(phoneNumber);
    }, []);

    useEffect(() => {
        fetch('https://izirtuland.ir/pages/api/sendsms')
            .then((res) => res.json())
            .then((da) => setDa(da))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    useEffect(() => {
        fetch("https://izirtuland.ir/pages/api/infouser")
            .then((res) => res.json())
            .then((data) => setData(data))
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    // Add new user
    const addNewUser = async () => {
        try {
            const res = await fetch("https://izirtuland.ir/pages/api/infouser", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(info),
            });
            if (res.ok) {
                const addedUser = await res.json();
                setData([...data, addedUser]);
                setInfo({ firstname: "", lastname: "", numberPhone: "", address: "" });
                setIsSaved(true);
            }
        } catch (error) {
            console.error("Error adding user:", error);
        }
    };

    // Update existing user
    const updateUser = async () => {
        try {
            const res = await fetch(`https://izirtuland.ir/pages/api/infouser`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(info),
            });
            if (res.ok) {
                const updatedUser = await res.json();
                setData(data.map((item) => (item._id === updatedUser._id ? updatedUser : item)));
                setEditingUserInfo(null);
                setInfo({ firstname: "", lastname: "", numberPhone: "", address: "", _id: "" });
                setIsSaved(true);
            }
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    const handleEdit = (user) => {
        setEditingUserInfo(user._id);
        setInfo({
            firstname: user.firstname,
            lastname: user.lastname,
            numberPhone: user.numberPhone,
            address: user.address,
            _id: user._id
        });
        setIsSaved(false);
    };

    const isUserInfoAlreadySubmitted = () => {
        return data && data.some((user) => user.numberPhone === currentUser);
    };

    useEffect(() => {
        if (info.numberPhone && info.numberPhone !== currentUser) {
            setPhoneError("شماره تلفن وارد شده با شماره شما تطابق ندارد.");
        } else {
            setPhoneError("");
        }
    }, [info.numberPhone, currentUser]);

    const isFormValid = () => {
        return info.numberPhone !== "" && phoneError === "";
    };

    return (
        <div className="max-w-2xl font-primaryDemibold mx-auto p-6 bg-white shadow-lg rounded-lg mt-10" dir="rtl">
            <h1 className="text-2xl text-gray-800 mb-6 text-center">لطفا اطلاعات خود را تکمیل کنید</h1>
            <h1 className="text-xl mb-6 text-center text-red-500">لطفا با شماره موبایلی که داخل سایت وارد شدید اطلاعات خود را تکمیل کنید</h1>
            <div className="space-y-4">
                <div>
                    <label className="block text-gray-700 font-medium">نام :</label>
                    <input
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="محمد"
                        type="text"
                        value={info.firstname}
                        onChange={(e) => setInfo({ ...info, firstname: e.target.value })}
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium">نام خانوادگی :</label>
                    <input
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="حلیمی"
                        type="text"
                        value={info.lastname}
                        onChange={(e) => setInfo({ ...info, lastname: e.target.value })}
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium">شماره تلفن :</label>
                    <input
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="09141234567"
                        type="text"
                        value={info.numberPhone}
                        onChange={(e) => setInfo({ ...info, numberPhone: e.target.value })}
                        disabled={isUserInfoAlreadySubmitted()}
                    />
                    {phoneError && <p className="text-red-500 text-sm mt-1">{phoneError}</p>}
                </div>
                <div>
                    <label className="block text-gray-700 font-medium">آدرس :</label>
                    <input
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="بوکان ...."
                        type="text"
                        value={info.address}
                        onChange={(e) => setInfo({ ...info, address: e.target.value })}
                    />
                </div>
            </div>
            <button
                className="w-full mt-6 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none"
                onClick={isUserInfoAlreadySubmitted() ? updateUser : addNewUser}
                disabled={!isFormValid()}
            >
                {isUserInfoAlreadySubmitted() ? "ویرایش اطلاعات" : "افزودن اطلاعات"}
            </button>
            <div className="w-full mt-6">
                {
                    da && Array.isArray(da) ? (
                        data && Array.isArray(data) && data.filter((user) => user.numberPhone === currentUser)
                            .map((item) => (
                                <div key={item._id} className="flex justify-between items-center border-b py-2">
                                    <div>
                                        <p>{item.firstname}</p>
                                        <p>{item.lastname}</p>
                                        <p>{item.numberPhone}</p>
                                        <p>{item.address}</p>
                                    </div>
                                    <button
                                        className="bg-blue-500 text-white hover:bg-white hover:text-blue-500 border-2 border-blue-500 p-2 rounded-lg"
                                        onClick={() => handleEdit(item)}
                                    >
                                        ویرایش
                                    </button>
                                </div>
                            ))
                    ) : (
                        <p>لیست داده‌ها موجود نیست</p>
                    )
                }
            </div>
        </div>
    );
};

export default UserPanel;
