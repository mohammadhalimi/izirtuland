import mongoose from 'mongoose';

const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const modelName = 'listfertilizer';

const postSchema = new Schema({
    name: {
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
    link :{
        type : String,
        required:true
    }
}, { timestamps: true });

const ListFertilizer = mongoose.models[modelName] || mongoose.model(modelName, postSchema);

export default ListFertilizer;