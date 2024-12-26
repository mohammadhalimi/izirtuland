import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(req, res) {
    const body = await req.json();
    const { token, inputCode } = body;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // بررسی کد احراز هویت (برای سادگی فرض می‌کنیم موفقیت‌آمیز است)
        if (parseInt(inputCode) === decoded.token) {
            const userToken = jwt.sign(
                { receptor: decoded.receptor }, // اضافه کردن receptor به توکن
                process.env.JWT_SECRET, // کلید محرمانه
                { expiresIn: '1h' } // مدت اعتبار توکن
            );
            return NextResponse.json({ success: true, userToken }, { status: 200 });
        } else {
            return NextResponse.json({ success: false, message: 'کد نامعتبر است' },{ status: 401 });
        }

    } catch (error) {
        return NextResponse.json({ success: false, message: 'توکن نامعتبر یا منقضی شده' }, { status: 400 });
    }
}