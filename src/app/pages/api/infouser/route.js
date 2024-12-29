import { NextResponse } from "next/server";
import connect from "../../../../../db"
import InfoUser from '../../../../../models/infoUser'

export const GET = async () => {
    try {
        await connect();
        const posts = await InfoUser.find();
        return new NextResponse(JSON.stringify(posts),{status:200})
    } catch(error) {
        return new NextResponse("error in fetching posts " + error,{status:500})
    }
}

export const POST = async (request) => {
  try {
    await connect();
    const { firstname, lastname, numberPhone, address } = await request.json();
    const newUser = new InfoUser({
      firstname,
      lastname,
      numberPhone,
      address,
    });
    await newUser.save();
    return new NextResponse(JSON.stringify(newUser), { status: 201 });
  } catch (error) {
    return new NextResponse("Error in adding user: " + error, { status: 500 });
  }
};

export const PUT = async (request) => {
  try {
    await connect();
    const { firstname, lastname, numberPhone, address, _id } = await request.json();
    const updatedUser = await InfoUser.findByIdAndUpdate(
      _id,
      {
        firstname,
        lastname,
        numberPhone,
        address,
      },
      { new: true }
    );

    if (!updatedUser) {
      return new NextResponse("User not found", { status: 404 });
    }
    return new NextResponse(JSON.stringify(updatedUser), { status: 200 });
  } catch (error) {
    console.error("Failed to update user:", error);
    return new NextResponse("Error in updating user: " + error.message, { status: 500 });
}
};
