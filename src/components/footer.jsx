'use client'
import { useMemo,useState,useEffect } from 'react';
import dynamic from 'next/dynamic';
import Telegram from './SVG/telegram';
import Instagram from './SVG/instagram';
import Image from 'next/image';
import Err from 'app/not-found';

const SkeletonLoader = () => {
    return (
        <div className="animate-pulse space-y-4">
            <div className="h-6 bg-gray-300 rounded w-1/4 mx-auto"></div>
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
            <div className="h-4 bg-gray-300 rounded w-1/3 mx-auto"></div>
        </div>
    );
};

const Footer = () => {
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(true);
    
    const Map = useMemo(() => dynamic(
        () => import('./map'),
        {
            loading: () => <p></p>,
            ssr: false
        }
    ), [])

    
  
    useEffect(() => {
      fetch('https://izirtuland.liara.run/pages/api/footer')
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
            <footer>
                <div className="mx-auto w-full max-w-screen-xl">
                    <div className="grid grid-cols-2 gap-8 px-4 py-6 lg:py-8 md:grid-cols-4 bg-color2 text-white" dir="rtl">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <SkeletonLoader key={index} />
                        ))}
                    </div>
                    <div className="px-4 py-6 bg-gray-100 items-center text-center animate-pulse" dir="rtl">
                       <div className='h-6 bg-gray-300 rounded w-1/4 mx-auto'></div>
                    </div>
                </div>
            </footer>
        );
    }
    if (!data) return <Err />;

    return (
        <footer>
            <div className="mx-auto w-full max-w-screen-xl">
                <div className="grid grid-cols-2 gap-8 px-4 py-6 lg:py-8 md:grid-cols-4 bg-color2 text-white" dir="rtl">
                    {
                        data.map((items, itemIndex) => (
                            items.foot.map((item, footIndex) => (
                                <div key={`${item.id}-${itemIndex}-${footIndex}`} className='z-0'>
                                    <h2 className="mb-6 pb-2 text-base font-primaryDemibold border-b-4 border-white w-fit" key={item.id}>
                                        {item.title}
                                    </h2>
                                    <p className="text-right font-primaryRegular">{item.text}</p>
                                    {item.id === 3 && (
                                        <Map position={[35.7303917, 51.4443998]} zoom={16} height={`h-40`} />
                                    )}
                                    {item.id === 1 && (
                                        <ul className='flex flex-row gap-4'>
                                            <li>
                                                <Instagram />
                                            </li>
                                            <li>
                                                <Telegram />
                                            </li>
                                        </ul>

                                    )}
                                    {item.id === 2 && (
                                        <div className='flex lg:flex-row flex-col gap-2'>
                                            <Image src={item.pic} width={128} height={128} alt="footer Logo" className='bg-white' />
                                            <Image src={item.pic1} width={128} height={128} alt="footer Logo" className='bg-white' />
                                        </div>
                                    )}
                                </div>
                            ))
                        ))
                    }
                </div>
                <div className="px-4 py-6 bg-gray-100 items-center text-center" dir="rtl">
                    {
                        data.map((items) => (
                            items.rules.map((item) => (
                                <span key={item.id} className="text-sm text-gray-500 text-center font-primaryRegular">
                                    {item.text}
                                </span>
                            ))
                        ))
                    }
                </div>
            </div>
        </footer>
    )
}

export default Footer;