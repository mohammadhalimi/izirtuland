import mongoose from 'mongoose';

const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const modelName = 'infoUser';

const postSchema = new Schema({

    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    numberPhone:{
        type:String,
        required:true
    },
    address: {
        type:String,
        required:true,
    }
}, { timestamps: true });

const InfoUser = mongoose.models[modelName] || mongoose.model(modelName, postSchema);

export default InfoUser;