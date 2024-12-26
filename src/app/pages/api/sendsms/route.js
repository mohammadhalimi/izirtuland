import Kavenegar from 'kavenegar';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import Sendsms from '../../../../../models/sendsms'; // Mongoose model
import connect from "../../../../../db";

export const GET = async (request) => {
    try {
        await connect();
        const posts = await Sendsms.find();
        return new NextResponse(JSON.stringify(posts), { status: 200 });
    } catch (error) {
        return new NextResponse("error in fetching posts " + error, { status: 500 });
    }
};

const api = Kavenegar.KavenegarApi({
    apikey: process.env.API_KEY, // Kavenegar API Key
});

export async function POST(req) {
    const { receptor, token, template } = await req.json(); // Get data from request body

    try {
        // Check if receptor already exists in the database
        const existingEntry = await Sendsms.findOne({ receptor });
        if (existingEntry) {
            const response = await api.VerifyLookup({ receptor, token, template });
            console.log('Receptor:', receptor);
            console.log('Token:', token);
            console.log('Template:', template);

            // Generate a temporary JWT token
            const tempToken = jwt.sign(
                { receptor, token },
                process.env.JWT_SECRET,
                { expiresIn: '2m' } // Token valid for 2 minutes
            );
            return NextResponse.json({ success: true, response, tempToken }, { status: 200 }); // Return success response
        } else {
            const response = await api.VerifyLookup({ receptor, token, template });
            console.log('Receptor:', receptor);
            console.log('Token:', token);
            console.log('Template:', template);

            // Generate a temporary JWT token
            const tempToken = jwt.sign(
                { receptor, token },
                process.env.JWT_SECRET,
                { expiresIn: '2m' } // Token valid for 2 minutes
            );
            // Save new entry in the database
            const newVerifyEntry = new Sendsms({ receptor, token });
            await newVerifyEntry.save();
            return NextResponse.json({ success: true, response, tempToken }, { status: 200 }); // Return success response
        }
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 }); // Return error with status 500
    }
}
