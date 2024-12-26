import { NextResponse } from "next/server";
import connect from "../../../../../db"
import PageProducts from '../../../../../models/pageproduct'
import mongoose from 'mongoose'; // Make sure to import mongoose

export const GET = async (request) => {
    try {
        await connect();
        const posts = await PageProducts.find();
        return new NextResponse(JSON.stringify(posts),{status:200})
    } catch(error) {
        return new NextResponse("error in fetching posts " + error,{status:500})
    }
}

// POST a new item
export async function POST(request) {
    try {
        const item = await request.json();
        const newItem = {
            title: item.title,
            text: item.text,
            table: item.table,
            id: item.id,
            price: item.price,
            pic: item.pic,
            brand: item.brand,
            package: item.package,
            buy: item.buy,
        };

        // ذخیره‌سازی داده‌ها در پایگاه داده
        const savedItem = await PageProducts.create(newItem);

        return new Response(JSON.stringify(savedItem), {
            headers: {
                "Content-Type": "application/json",
            },
            status: 201,
        });
    } catch (error) {
        return new Response("Error in saving item: " + error.message, {
            status: 500,
        });
    }
}


// DELETE an item by ID
export async function DELETE(request) {
    const deletedItem = await request.json();
    const id = deletedItem._id; // Get the ID from the request

    if (!id) {
        return NextResponse.json({ error: 'ID is required to delete an item' }, { status: 400 });
    }

    // Log the incoming ID
    console.log("Attempting to delete item with ID:", id);

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
    }

    try {
        const objectId = new mongoose.Types.ObjectId(id); // Convert it to ObjectId
        const deletedItem = await PageProducts.findByIdAndDelete(objectId);

        if (deletedItem) {
            return NextResponse.json({ message: 'Deleted successfully' });
        } else {
            return NextResponse.json({ error: 'Item not found' }, { status: 404 });
        }
    } catch (error) {
        console.error("Error in deleting item:", error);
        return NextResponse.json({ error: 'Error in deleting item: ' + error.message }, { status: 500 });
    }
}



// PUT to update an item by ID


export async function PUT(request) {
    try {
        const updatedItem = await request.json();
        const itemId = updatedItem._id;

        console.log("Updating item with ID:", itemId); // Log the ID

        if (!mongoose.Types.ObjectId.isValid(itemId)) {
            return NextResponse.json({ error: 'Invalid item ID' }, { status: 400 }); // Validate ObjectId
        }

        const objectId = new mongoose.Types.ObjectId(itemId);
        const existingItem = await PageProducts.findById(objectId);

        console.log("Existing Item:", existingItem); // Log the existing item

        if (existingItem) {
            existingItem.title = updatedItem.title || existingItem.title;
            existingItem.text = updatedItem.text || existingItem.text;
            existingItem.table = updatedItem.table || existingItem.table;
            existingItem.price = updatedItem.price || existingItem.price;
            existingItem.pic = updatedItem.pic || existingItem.pic;
            existingItem.brand = updatedItem.brand || existingItem.brand;
            existingItem.package = updatedItem.package || existingItem.package;
            existingItem.buy = updatedItem.buy || existingItem.buy;
            existingItem.id = updatedItem.id || existingItem.id;

            const savedItem = await existingItem.save();
            return NextResponse.json(savedItem);
        } else {
            return NextResponse.json({ error: 'Item not found' }, { status: 404 });
        }
    } catch (error) {
        return NextResponse.json({ error: 'Error updating item: ' + error.message }, { status: 500 });
    }
}