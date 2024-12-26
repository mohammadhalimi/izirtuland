import Zibal from 'zibal';
import { NextResponse } from 'next/server';
import Kavenegar from 'kavenegar';

const zibal = new Zibal({
  merchant: 'zibal',
});

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const trackId = searchParams.get('trackId');
  const success = searchParams.get('success');
  const status = searchParams.get('status');

  if (success === '1' && status === '2') {
    try {
      const response = await zibal.verify({ trackId });

      if (response.result === 100) {
        return NextResponse.redirect(new URL(`/payment-success?trackId=${trackId}`, request.url));
      } else {
        return NextResponse.redirect(new URL('/payment-failure', request.url));
      }
    } catch (error) {
      console.error('Error during payment verification:', error);
      return NextResponse.redirect(new URL('/payment-failure', request.url));
    }
  } else {
    return NextResponse.redirect(new URL('/payment-failure', request.url));
  }
}

const api = Kavenegar.KavenegarApi({
    apikey: process.env.API_KEY,
});

export async function POST(req) {
  const { receptor, token, template } = await req.json();
  try {
    const response = await api.VerifyLookup({ receptor, token, template });
    console.log('Receptor:', receptor);
    console.log('Token:', token);
    console.log('Template:', template);
    return NextResponse.json({ success: true, response }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });

  }
} 
