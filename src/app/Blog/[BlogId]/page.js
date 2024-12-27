"use client"

import { useEffect, useState } from 'react';
import Image from 'next/image';
import BlogPostSkeleton from '@/components/blogPostLoading';
import Err from 'app/not-found';

const Blogs = ({ params }) => {

    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        fetch('http://localhost:3000/pages/api/pageblogs')
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

    if (isLoading) return <BlogPostSkeleton />
    if (!data) return <Err />;
     return (
        <div className='max-w-screen-xl flex flex-wrap justify-center mx-auto p-4 my-4' dir='rtl'>
            {
                data.map((items) => (
                    items.post.map((item) => (
                        <div key={item.id} className='w-full p-2'>
                            {item.id === parseInt(params.BlogId) && (
                                <>
                                    <h1 className='text-2xl font-primaryDemibold mb-6'>
                                        {item.title}
                                    </h1>
                                    <Image
                                        src={`${item.link}`}
                                        width={200}
                                        height={200}
                                        alt='logo'
                                        className='object-cover md:w-[600px] md:h-[300px] w-[400px] h-[200px] rounded shadow-md mx-auto'
                                    />
                                    <p className='text-gray-700 mt-2 md:text-lg text-justify font-primaryMedium leading-relaxed whitespace-pre-line'>
                                        {item.text}
                                    </p>
                                </>
                            )}
                        </div>
                    ))
                ))
            }
        </div>
    );
};

export default Blogs;






