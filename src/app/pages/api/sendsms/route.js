import Kavenegar from 'kavenegar';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import Sendsms from '../../../../../models/sendsms';
import connect from "../../../../../db";

export const GET = async () => {
    try {
        await connect();
        const posts = await Sendsms.find();
        return new NextResponse(JSON.stringify(posts), { status: 200 });
    } catch (error) {
        return new NextResponse("error in fetching posts " + error, { status: 500 });
    }
};

const api = Kavenegar.KavenegarApi({
    apikey: process.env.API_KEY,
});

export async function POST(req) {
    const { receptor, token, template } = await req.json();

    try {
        const existingEntry = await Sendsms.findOne({ receptor });
        if (existingEntry) {
            const response = await api.VerifyLookup({ receptor, token, template });

            const tempToken = jwt.sign(
                { receptor, token },
                process.env.JWT_SECRET,
                { expiresIn: '2m' }
            );
            return NextResponse.json({ success: true, response, tempToken }, { status: 200 });
        } else {
            const response = await api.VerifyLookup({ receptor, token, template });

            const tempToken = jwt.sign(
                { receptor, token },
                process.env.JWT_SECRET,
                { expiresIn: '2m' }
            );
            const newVerifyEntry = new Sendsms({ receptor, token });
            await newVerifyEntry.save();
            return NextResponse.json({ success: true, response, tempToken }, { status: 200 });
        }
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
