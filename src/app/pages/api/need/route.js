import { NextResponse } from "next/server";
import connect from "../../../../../db"
import Need from '../../../../../models/need'

export const GET = async () => {
    try {
        await connect();
        const posts = await Need.find();
        return new NextResponse(JSON.stringify(posts),{status:200})
    } catch(error) {
        return new NextResponse("error in fetching posts " + error,{status:500})
    }
}