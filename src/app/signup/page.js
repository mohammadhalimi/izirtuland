'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function Sms() {
    const [receptor, setReceptor] = useState('');
    const [inputCode, setInputCode] = useState('');
    const [message, setMessage] = useState('');
    const [sending, setSending] = useState(false);
    const [timer, setTimer] = useState(0);
    const [isSendingDisabled, setIsSendingDisabled] = useState(false);
    const [tempToken, setTempToken] = useState('');
    const router = useRouter();
    const [data, setData] = useState([]);
    const intervalId = useRef(null);

    useEffect(() => {
        const savedReceptor = localStorage.getItem('receptor');
        const savedTimer = localStorage.getItem('timer');
        const savedTempToken = localStorage.getItem('tempToken');

        if (savedReceptor) setReceptor(savedReceptor);
        if (savedTempToken) setTempToken(savedTempToken);

        if (savedTimer) {
            const remainingTime = parseInt(savedTimer, 10) - Math.floor(Date.now() / 1000);
            if (remainingTime > 0) {
                setTimer(remainingTime);
                setIsSendingDisabled(true);
            } else {
                localStorage.removeItem('timer');
            }
        }
    }, []);

    useEffect(() => {
        if (timer > 0) {
            intervalId.current = setInterval(() => {
                setTimer((prev) => {
                    if (prev <= 1) {
                        clearInterval(intervalId.current);
                        setIsSendingDisabled(false);
                        localStorage.removeItem('timer');
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => {
            clearInterval(intervalId.current);
        };
    }, [timer]);

    useEffect(() => {
        fetch('https://izirtuland.ir/pages/api/forminput')
            .then((res) => res.json())
            .then((data) => {
                setData(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleSendSms = async () => {
        setSending(true);
        const token = Math.floor(Math.random() * 900000) + 100000;
        const response = await fetch('https://izirtuland.ir/pages/api/sendsms', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                receptor,
                token,
                template: 'porbar',
            }),
        });
        const data = await response.json();
        if (data.success) {
            setMessage('پیامک با موفقیت ارسال شد، کد را وارد کنید.');
            setTempToken(data.tempToken);
            localStorage.setItem('receptor', receptor);
            localStorage.setItem('tempToken', data.tempToken);
            const expiryTime = Math.floor(Date.now() / 1000) + 120;
            localStorage.setItem('timer', expiryTime);

            setIsSendingDisabled(true);
            setTimer(120);
        } else {
            setMessage('خطا در ارسال پیامک. لطفا دوباره تلاش کنید.');
        }
        setSending(false);
    };

    const handleVerify = async () => {
        const response = await fetch('https://izirtuland.ir/pages/api/authenticate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: tempToken, inputCode }),
        });
        const data = await response.json();
        if (data.success) {
            localStorage.removeItem('receptor');
            localStorage.removeItem('tempToken');
            localStorage.removeItem('timer');
            document.cookie = `user-token=${data.userToken}; path=/; max-age=3600`;
            setMessage('ورود موفقیت‌آمیز بود!');
            router.push(`/userpanel/${receptor}`);
        } else {
            setMessage(data.message);
        }
    };

    return (
        <div className="max-w-screen-xl mx-auto min-h-screen flex items-center justify-center p-4">
            {data.map((items) => (
                <div
                    className="max-w-md mx-auto p-6 bg-gray-100 rounded-lg shadow-lg my-auto"
                    dir="rtl"
                    key={items.id}
                >
                    <h1 className="text-2xl font-primaryDemibold text-center mb-4">{items.title}</h1>
                    <input
                        type="text"
                        placeholder="شماره تلفن"
                        value={receptor}
                        onChange={(e) => {
                            setReceptor(e.target.value);
                            localStorage.setItem('receptor', e.target.value);
                        }}
                        className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 font-primaryMedium"
                    />
                    <button
                        onClick={handleSendSms}
                        disabled={sending || isSendingDisabled}
                        className="w-full bg-blue-600 text-white font-primaryDemibold py-2 rounded hover:bg-color2 transition"
                    >
                        {sending
                            ? 'در حال ارسال...'
                            : isSendingDisabled
                            ? `لطفا ${timer} ثانیه صبر کنید`
                            : 'ارسال کد احراز هویت'}
                    </button>
                    <input
                        type="text"
                        placeholder="کد احراز هویت"
                        value={inputCode}
                        onChange={(e) => setInputCode(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded mt-4 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 font-primaryMedium"
                    />
                    <button
                        onClick={handleVerify}
                        className="w-full bg-green-600 text-white font-primaryDemibold py-2 rounded hover:bg-color1 transition"
                    >
                        {items.name}
                    </button>
                    {message && <p className="mt-4 text-center text-red-500 font-primaryRegular">{message}</p>}
                </div>
            ))}
        </div>
    );
}
