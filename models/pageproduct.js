import mongoose from 'mongoose';

const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const modelName = 'pageproduct';

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    table: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true
    },
    price: {
        type:String,
        required:true
    },
    pic : {
        type:String,
        required:true
    },
    brand: {
        type: String,
        required:true
    },
    package : {
        type: String,
        required : true
    },
    buy : {
        type : String,
        required : true
    },
}, { timestamps: true });

const PageProducts = mongoose.models[modelName] || mongoose.model(modelName, postSchema);

export default PageProducts;