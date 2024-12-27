'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Warning from '@/components/SVG/warning';
import Err from 'app/not-found';

export default function PaymentFailed() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('https://izirtuland.liara.run/pages/api/warning')
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

  if (loading) {
    return (
      <div className="max-w-screen-xl mx-auto min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center p-6 bg-white rounded-lg shadow-lg">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-300 rounded-md mb-4"></div>
            <div className="h-8 bg-gray-300 rounded-md mb-2"></div>
            <div className="h-8 bg-gray-300 rounded-md mb-2"></div>
          </div>
        </div>
      </div>
    )
  };
  if (!data) return <Err />;

  return (
    <div className="max-w-screen-xl mx-auto min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-6 bg-white rounded-lg shadow-lg border-2 border-red-500">
        <div className='flex justify-center items-center mb-4'>
          <Warning fill={'#ff0400'} />
        </div>
        {
          data.map((items) => (
            <div key={items.id}>
              <h1 className="text-xl font-primaryDemibold mb-4 text-red-600">{items.title}</h1>
              <Link href="/" className="bg-red-500 text-white text-lg font-primaryMedium p-2 rounded-lg hover:bg-white hover:text-red-500 border-2 border-red-500">
                {items.name}
              </Link>
            </div>
          ))
        }
      </div>
    </div>

  );
}
