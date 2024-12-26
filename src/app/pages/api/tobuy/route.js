import { NextResponse } from 'next/server';
import connect from '../../../../../db';
import Tobuy from '../../../../../models/tobuy';

export const GET = async (request) => {
    try {
        await connect();
        const posts = await Tobuy.find();
        return new NextResponse(JSON.stringify(posts),{status:200})
    } catch(error) {
        return new NextResponse("error in fetching posts " + error,{status:500})
    }
}

export async function POST(req) {
    try {
        await connect(); // اتصال به دیتابیس
        const { product } = await req.json(); // گرفتن داده‌های درخواست

        if (!product || !product.id) {
            return NextResponse.json({ message: 'اطلاعات محصول ناقص است.' }, { status: 400 });
        }

        // اعتبارسنجی و ذخیره محصول با استفاده از اسکیما
        await Tobuy.create(product);

        return NextResponse.json({ message: 'محصول با موفقیت ذخیره شد.' }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'خطایی رخ داده است.' }, { status: 500 });
    }
}
