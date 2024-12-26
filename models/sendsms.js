import mongoose from 'mongoose';

const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const modelName = 'sendsms';

const postSchema = new Schema({
    receptor: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: false
    }
}, { timestamps: true });

const Sendsms = mongoose.models[modelName] || mongoose.model(modelName, postSchema);

export default Sendsms;