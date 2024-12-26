import { NextResponse } from "next/server";
import connect from "../../../../../db"
import InfoUser from '../../../../../models/infoUser'

export const GET = async (request) => {
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
    // Connect to MongoDB
    await connect();

    // Parse the request body (User Info)
    const { firstname, lastname, numberPhone, address } = await request.json();

    // Create a new user
    const newUser = new InfoUser({
      firstname,
      lastname,
      numberPhone,
      address,
    });

    // Save the new user to the database
    await newUser.save();

    // Return success response with the new user data
    return new NextResponse(JSON.stringify(newUser), { status: 201 });
  } catch (error) {
    return new NextResponse("Error in adding user: " + error, { status: 500 });
  }
};


export const PUT = async (request) => {
  try {
    // Connect to MongoDB
    await connect();

    const { firstname, lastname, numberPhone, address, _id } = await request.json();

    // Find the user by ID and update
    const updatedUser = await InfoUser.findByIdAndUpdate(
      _id,
      {
        firstname,
        lastname,
        numberPhone,
        address,
      },
      { new: true } // Return the updated document
    );

    // If user not found
    if (!updatedUser) {
      return new NextResponse("User not found", { status: 404 });
    }

    // Return the updated user data
    return new NextResponse(JSON.stringify(updatedUser), { status: 200 });
  } catch (error) {
    console.error("Failed to update user:", error); // چاپ خطا در سرور
    return new NextResponse("Error in updating user: " + error.message, { status: 500 });
}
};
