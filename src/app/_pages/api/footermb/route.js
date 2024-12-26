import { NextResponse } from "next/server";
import connect from "../../../../../db"
import FooterMobile from '../../../../../models/footermobile'

export const GET = async (request) => {
    try {
        await connect();
        const posts = await FooterMobile.find();
        return new NextResponse(JSON.stringify(posts),{status:200})
    } catch(error) {
        return new NextResponse("error in fetching posts " + error,{status:500})
    }
}