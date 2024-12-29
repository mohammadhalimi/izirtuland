"use client"
import HeaderSm from './headerSm';
import { useState, useEffect } from 'react'
import Link from 'next/link';
import LogoBuy from './SVG/logoBuy'
import Login from './SVG/login';
import Err from '../app/not-found'
import Image from 'next/image';
import Humberger from './SVG/humberger';
import LoadingHeader from './loadingheader';

const Headers = () => {
    const [Open, SetOpen] = useState(false);
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        fetch('https://izirtuland.ir/pages/api/header')
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

    if (isLoading) return <LoadingHeader />
    if (!data) return <Err />;

    return (
        <nav className="bg-white sticky top-0 z-10 border-b-2">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
                <div className='flex flex-wrap items-center justify-between'>

                    {
                        data.map((item) => (
                            item.logo.map((it) => (
                                <Link href="/" className="flex items-center rtl:space-x-reverse" key={it.id}>
                                    <Image src={it.address} width={70} height={50} alt="porbarbaghestan Logo" />
                                    <span className=" text-2xl font-primaryBold whitespace-nowrap">
                                        {it.name}
                                    </span>
                                </Link>
                            ))
                        ))
                    }
                    <LogoBuy />
                    <div className='border px-2 ms-2 rounded lg:block hidden'>
                        {
                            data.map((item) => (
                                item.SignIn.map((it) => (
                                    <Link href={`${it.link}`} className='flex flex-wrap items-center' key={it.id}>
                                        <p className="font-primaryMedium rounded-lg m-2">{it.login}</p>
                                        <Login />
                                    </Link>
                                ))
                            ))
                        }

                    </div>
                </div>
                <button onClick={() => SetOpen(true)} data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-default" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <Humberger />
                </button>
                <div className="hidden w-full md:block md:w-auto" dir='rtl'>
                    <ul className="font-primaryDemibold text-lg flex flex-col mt-4 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:bg-white">

                        {
                            data.map((item) => (
                                item.headers.map((it) => (
                                    <li key={it.id}><Link href={`${it.link}`} key={it.id} className="block py-2 px-3 md:text-color2 hover:text-white hover:bg-color2 rounded-lg transition-colors duration-200">{it.name}</Link></li>
                                ))
                            ))
                        }
                    </ul>
                </div>
            </div>
            {
                Open && <HeaderSm onClick={() => SetOpen(false)} />
            }
        </nav>
    );
}

export default Headers;