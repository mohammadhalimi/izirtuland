import mongoose from 'mongoose';

const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const modelName = 'wawrning';

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const Warning = mongoose.models[modelName] || mongoose.model(modelName, postSchema);

export default Warning;