'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Success from '@/components/SVG/success';
import Link from 'next/link';
import Err from 'app/not-found';
import { useRouter } from 'next/navigation';

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const trackId = searchParams.get('trackId');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sentInfo, setSentInfo] = useState(false);
  const [orderSaved, setOrderSaved] = useState(false);
  const router = useRouter();

  let savingInProgress = false;

  useEffect(() => {
    fetch('https://izirtuland.ir/pages/api/success')
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
    const savedData = localStorage.getItem('final-buy');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      const finalBuyData = {
        ...parsedData,
        trackId: trackId,
      };
      localStorage.setItem('final-buy2', JSON.stringify(finalBuyData));
    }
  }, [trackId]);

  const SendInfo = async () => {
    if (trackId) {
      const finalBuyData = JSON.parse(localStorage.getItem('final-buy2'));
      const userPhone = finalBuyData?.userPhone || '';
      const track = finalBuyData?.trackId || '';

      try {
        const response = await fetch('https://izirtuland.ir/pages/api/callback', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            receptor: userPhone.toString(),
            token: track.toString(),
            template: 'Order',
          }),
        });
        const result = await response.json();
        console.log('Response from server:', result);
      } catch (error) {
        console.error('Error sending info:', error);
      }
    }
  };

  const SendAdmin = async () => {
    if (trackId) {
      const finalBuyData = JSON.parse(localStorage.getItem('final-buy2'));
      const track = finalBuyData?.trackId || '';

      try {
        const response = await fetch('https://izirtuland.ir/pages/api/sendinfoadmin', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            receptor: '09337061131',
            token: track.toString(),
            template: 'admin',
          }),
        });
        const result = await response.json();
        console.log('Response from server:', result);
      } catch (error) {
        console.error('Error sending info:', error);
      }
    }
  };

  const saveOrderToDatabase = async () => {
    if (savingInProgress || orderSaved) return;
    savingInProgress = true;

    const finalBuyData = JSON.parse(localStorage.getItem('final-buy2'));

    if (!finalBuyData) {
      console.error('No data found in localStorage');
      savingInProgress = false;
      return;
    }

    try {
      const response = await fetch('https://izirtuland.ir/pages/api/saveorder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(finalBuyData),
      });

      if (!response.ok) {
        throw new Error('Failed to save order');
      }

      const result = await response.json();
      console.log('Order saved successfully:', result);

      localStorage.removeItem('final-buy');
      localStorage.removeItem('final-buy2');
      setOrderSaved(true);
    } catch (error) {
      console.error('Error saving order:', error);
    } finally {
      savingInProgress = false;
    }
  };

  useEffect(() => {
    if (!loading && data) {
      if (!orderSaved) saveOrderToDatabase();
      if (!sentInfo) {
        SendInfo();
        SendAdmin();
        setSentInfo(true);
      }
    }
  }, [loading]);

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/userpanel');
    }, 8000);

    return () => clearTimeout(timer);
  }, [router]);

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
    );
  }

  if (!data) return <Err />;

  return (
      <div className="max-w-screen-xl mx-auto min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center p-6 bg-white rounded-lg shadow-lg border-2 border-green-500">
          <div className="flex justify-center items-center mb-4">
            <Success />
          </div>
          {data.map((items) => (
            <div key={items.id}>
              <h1 className="text-xl font-primaryDemibold mb-4 text-green-600">{items.title}</h1>
              <h2 className="text-xl font-primaryDemibold mb-4 text-green-600">
                {items.track} {trackId}
              </h2>
              <Link
                href="/userpanel"
                className="bg-green-500 text-white text-lg font-primaryMedium p-2 rounded-lg hover:bg-white hover:text-green-500 border-2 border-green-500"
              >
                {items.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
  );
}
