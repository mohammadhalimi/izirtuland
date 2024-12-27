"use client"

import React from "react";
import LoadContact from "./loadingcontact";
import { useState, useEffect, useMemo } from "react";
import Err from "app/not-found";
import dynamic from "next/dynamic";

const CallContact = () => {

    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const [message, setMessage] = useState('');

    const Map = useMemo(() => dynamic(
        () => import('./map'),
        {
            loading: () => <p></p>,
            ssr: false
        }
    ), []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('pages/api/email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setMessage('ایمیل شما با موفقیت ارسال شد!');
                setFormData({ name: '', email: '', message: '' });
            } else {
                setMessage('ارسال ایمیل با مشکل مواجه شد. لطفا دوباره تلاش کنید.');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('خطایی رخ داد. لطفا دوباره تلاش کنید.');
        }
    };

    useEffect(() => {
        fetch('https://izirtuland.liara.run/pages/api/contact')
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


    if (isLoading) return <LoadContact />;
    if (!data) return <Err />;
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 w-full mt-16 border rounded p-4 gap-4">
            <div className="min-h-64">
                <Map position={[35.7303917, 51.4443998]} zoom={15} height={`h-64 md:h-full`} />
            </div>
            <div dir="rtl" className="order-first md:order-last">
                <form onSubmit={handleSubmit}>
                    <div className="mb-6 gap-y-4">
                        {data.map((items) => (
                            items.call.map((item) => (
                                <React.Fragment key={`call-${item.id}`}>
                                    {item.id === 1 ? (
                                        <p className="text-lg font-primaryBold">{item.text}</p>
                                    ) : (
                                        <p className="text-gray-500 font-primaryRegular">{item.text}</p>
                                    )}
                                </React.Fragment>
                            ))
                        ))}
                    </div>
                    {data.map((items) => (
                        items.form.map((item) => (
                            <div className="mb-6" key={`form-${item.id}`}>
                                {item.id === 1 && (
                                    <>
                                        <label htmlFor="text" className="block mb-2 text-md font-medium text-gray-900 font-primaryRegular">
                                            {item.label}
                                        </label>
                                        <input
                                            type="text"
                                            id="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 font-primaryRegular"
                                            placeholder={item.placeholder}
                                            required
                                        />
                                    </>
                                )}
                                {item.id === 2 && (
                                    <>
                                        <label htmlFor="email" className="block mb-2 text-md font-medium text-gray-900 font-primaryRegular">
                                            {item.label}
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 font-primaryRegular"
                                            placeholder={item.placeholder}
                                            required
                                        />
                                    </>
                                )}
                                {item.id === 3 && (
                                    <>
                                        <label htmlFor="message" className="block mb-2 text-md text-gray-900 font-primaryRegular">
                                            {item.label}
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows="4"
                                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 resize-none font-primaryRegular"
                                            placeholder={item.placeholder}
                                        />
                                    </>
                                )}
                            </div>
                        ))
                    ))}
                    {data.map((items) => (
                        items.button.map((item) => (
                            <button
                                key={`button-${item.id}`}
                                type="submit"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center font-primaryDemibold"
                            >
                                {item.name}
                            </button>
                        ))
                    ))}
                </form>
                {message && (
                    <p className={`mt-4 text-lg font-primaryMedium ${message.includes('موفقیت') ? 'text-green-600' : 'text-red-600'}`}>
                        {message}
                    </p>
                )}
            </div>
        </div>
    )
}

export default CallContact;