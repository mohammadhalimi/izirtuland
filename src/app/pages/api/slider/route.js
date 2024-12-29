import { NextResponse } from "next/server";
import connect from "../../../../../db"
import Slider from '../../../../../models/slider'

export const GET = async () => {
    try {
        await connect();
        const posts = await Slider.find();
        return new NextResponse(JSON.stringify(posts),{status:200})
    } catch(error) {
        return new NextResponse("error in fetching posts " + error,{status:500})
    }
}