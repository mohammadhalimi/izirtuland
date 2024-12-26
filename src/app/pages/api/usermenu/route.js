import { NextResponse } from "next/server";
import connect from "../../../../../db"
import UserMenu from '../../../../../models/usermenu'

export const GET = async (request) => {
    try {
        await connect();
        const posts = await UserMenu.find();
        return new NextResponse(JSON.stringify(posts),{status:200})
    } catch(error) {
        return new NextResponse("error in fetching posts " + error,{status:500})
    }
}