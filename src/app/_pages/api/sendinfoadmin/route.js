import { NextResponse } from 'next/server';
import Kavenegar from 'kavenegar';

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