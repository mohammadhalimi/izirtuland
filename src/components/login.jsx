'use client';
import { useState, useEffect } from "react";
import Err from "app/not-found";


const Login = ({ username, password, onUsernameChange, onPasswordChange, onLogin }) => {
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://izirtuland.liara.run/pages/api/login')
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
            <div className="max-w-screen-xl mx-auto min-h-screen flex items-center justify-center bg-gray-100 p-4">
                <div className="w-full max-w-sm bg-white rounded-lg shadow-lg p-6 space-y-6">
                    <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
                    <div className="h-10 bg-gray-200 rounded w-full mb-4"></div>
                    <div className="h-10 bg-gray-200 rounded w-full mb-4"></div>
                    <div className="h-10 bg-gray-200 rounded w-full mb-4"></div>
                </div>
            </div>
        )
    }

    if (!data) return <Err />;

    return (
        <div className="max-w-screen-xl mx-auto min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-sm  bg-white rounded-lg shadow-lg p-6 space-y-6" dir="rtl">
                {
                    data.map((items) => (
                        <>
                            <h2 className="text-2xl font-primaryDemibold text-center text-gray-800">{items.title}</h2>
                            <input
                                type="text"
                                placeholder="نام کاربری"
                                value={username}
                                onChange={onUsernameChange}
                                className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="password"
                                placeholder="رمز عبور"
                                value={password}
                                onChange={onPasswordChange}
                                className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                onClick={onLogin}
                                className="w-full font-primaryDemibold bg-blue-500 text-white p-3 rounded-md hover:bg-color2 transition-colors"
                            >
                                {items.text}
                            </button>
                        </>
                    ))
                }
            </div>
        </div>

    );
}

export default Login;
