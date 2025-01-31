import Verify from '../../../../../models/sendsms';

export async function POST(request) {
    try {
        const item = await request.json();
        const newItem = {
            receptor: item.receptor,
            token: item.token
        };
        const existingItem = await Verify.findOne({ receptor: newItem.receptor });

        if (existingItem) {
            return new Response("Error: receptor number already exists.", {
                status: 409,
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }
        const savedItem = await Verify.create(newItem);
        return new Response(JSON.stringify(savedItem), {
            headers: {
                "Content-Type": "application/json",
            },
            status: 201,
        });
    } catch (error) {
        console.error("Error in saving item:", error);
        return new Response("Error in saving item: " + error.message, {
            status: 500,
        });
    }
}