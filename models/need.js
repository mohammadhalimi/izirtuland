import mongoose from 'mongoose';

const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const modelName = 'need';

const postSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const Need = mongoose.models[modelName] || mongoose.model(modelName, postSchema);

export default Need;