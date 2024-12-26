"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Err from 'app/not-found';
import Image from 'next/image';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useState, useEffect } from 'react';
import { Pagination } from 'swiper/modules';
import Link from 'next/link';

const LiquidSlider = () => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [da , setDa] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/pages/api/liquidslider')
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

  useEffect(() => {
    fetch('http://localhost:3000/pages/api/listfertilizer')
      .then((res) => res.json())
      .then((da) => {
        setDa(da);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="max-w-screen-xl mx-auto p-4 bg-color1" dir="rtl">
        <div className='flex flex-cols text-center mb-6 justify-center'>
          <div className="w-1/4 h-8 bg-gray-300 rounded animate-pulse mb-2 "></div>
        </div>

        <Swiper
          spaceBetween={10}
          slidesPerView={2}
          breakpoints={{
            640: { slidesPerView: 3, spaceBetween: 10 },
            768: { slidesPerView: 4, spaceBetween: 15 },
            1024: { slidesPerView: 5, spaceBetween: 20 },
          }}
          pagination={{ clickable: true }}
          modules={[Pagination]}
        >
          {Array.from({ length: 5 }).map((_, index) => (
            <SwiperSlide key={index}>
              <div className="relative flex flex-col my-6 bg-white shadow-lg border border-gray-300 rounded-lg w-full duration-300">
                <div className="w-full h-48 bg-gray-300 rounded-t-lg animate-pulse"></div>
                <div className="p-3">
                  <div className="w-3/4 h-6 bg-gray-300 rounded animate-pulse mb-2"></div>
                  <div className="w-1/2 h-4 bg-gray-300 rounded animate-pulse mb-2"></div>
                  <div className="w-1/3 h-4 bg-gray-300 rounded animate-pulse mb-2"></div>
                  <div className="w-1/3 h-4 bg-gray-300 rounded animate-pulse mb-2"></div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    )
  };
  if (!data) return <Err />;
  if (!da) return <Err />;

  const filter2 = da.filter((item) => item.name.includes("مایع"))

  return (
    <div className="max-w-screen-xl mx-auto p-4 bg-color2" dir="rtl">
      <div className='text-center'>
        {
          data.map((items) => (
            items.title.map((item) => (
              <h1 className='text-white md:text-xl text-lg font-primaryBold stroke-black-500' key={item.id}>
                {item.name}
              </h1>
            ))
          ))
        }

      </div>
      <Swiper
        spaceBetween={10}
        slidesPerView={2}
        breakpoints={{
          640: { slidesPerView: 3, spaceBetween: 10 },
          768: { slidesPerView: 4, spaceBetween: 15 },
          1024: { slidesPerView: 5, spaceBetween: 20 },
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
      >
        {filter2.slice(0,9).map((item) =>
            <SwiperSlide key={item.id}>
              <Link href={`${item.link}`} key={item.id}>
                <div className="relative flex flex-col my-6 bg-white shadow-lg border border-gray-300 rounded-lg w-full">
                  <Image
                    src={item.pic}
                    layout="responsive"
                    height={200}
                    width={150}
                    alt="product"
                    className="relative w-full h-1/4 object-cover rounded-md p-4"
                  />
                  <div className="p-3">
                    <h1 className="mb-1 text-md text-gray-900 md:font-primaryDemibold font-primaryRegular truncate text-right" dir='ltr'>
                      {item.name.includes("مایع") ? item.name : ''}
                    </h1>
                    <p className="mb-2 text-left font-primaryLight md:font-primaryRegular text-gray-700">{item.price} تومان</p>
                    <p className="mb-2 font-primaryLight md:font-primaryRegular text-gray-900">{item.package}</p>
                    {
                      item.brand.includes('KHAK SHIMI')
                        ?
                        (<span className="bg-yellow-100 text-yellow-800 text-xs font-medium md:font-bold me-2 px-2.5 py-0.5 rounded border border-yellow-400">{item.brand}</span>)
                        :
                        (<span className="bg-green-100 text-green-800 text-xs font-medium md:font-bold me-2 px-2.5 py-0.5 rounded border border-green-400">{item.brand}</span>)
                    }
                  </div>
                </div>
              </Link>
            </SwiperSlide>
        )}
        {
          data.map((items) => (
            items.look.map((item) => (
              <SwiperSlide key={item.id}>
                <Link href={`${item.link}`} key={item.id}>
                  <div className="relative flex flex-col my-6 bg-white shadow-lg border border-gray-300 rounded-lg w-full duration-300 hover:scale-105">
                    <Image
                      src={item.pic}
                      layout="responsive"
                      height={200}
                      width={150}
                      alt="product"
                      className="relative w-full h-1/4 object-cover rounded-md p-4 blur"
                    />
                    <div className="p-3">
                      <h1 className="mb-1 text-md text-gray-900 md:font-primaryDemibold font-primaryRegular text-right" dir='ltr'>
                        {item.looking}
                      </h1>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))
          ))
        }

      </Swiper>
    </div >
  );
};

export default LiquidSlider;
