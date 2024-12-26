import Zibal from 'zibal';
import { NextResponse } from 'next/server';

const zibal = new Zibal({
  merchant: 'zibal',
  callbackUrl: 'http://localhost:3000/pages/api/callback',
});

export async function POST(request) {
  try {
    const { amount } = await request.json();

    const response = await zibal.request({
      amount,
    });

    if (response.result === 100) {
      return NextResponse.json({ paymentUrl: response.paymentUrl, trackId: response.trackId }, { status: 200 });
    } else {
      return NextResponse.json({ error: response.message }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
