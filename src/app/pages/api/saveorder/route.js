import connect from "../../../../../db";
import FinalOrder from '../../../../../models/finalorder';
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connect();

    const orderData = await req.json();
    if (!orderData.trackId || !orderData.userPhone || !orderData.items || !orderData.totalAmount) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const existingOrder = await FinalOrder.findOne({ trackId: orderData.trackId });
    if (existingOrder) {
      return NextResponse.json({ message: 'Order already exists', order: existingOrder }, { status: 200 });
    }

    const newOrder = new FinalOrder(orderData);
    const savedOrder = await newOrder.save();

    return NextResponse.json(
      { message: 'Order saved successfully', order: savedOrder },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error saving order:', error);
    return NextResponse.json({ error: 'Failed to save order' }, { status: 500 });
  }
}

export const GET = async () => {
    try {
        await connect();
        const posts = await FinalOrder.find();
        return new NextResponse(JSON.stringify(posts),{status:200})
    } catch(error) {
        return new NextResponse("error in fetching posts " + error,{status:500})
    }
}