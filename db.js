import mongoose from "mongoose";

const connect = async () => {
    try{
        await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URL);
    } catch (error) {
        throw new Error("Error in connecting to mongodb")
    }
}

export default connect;