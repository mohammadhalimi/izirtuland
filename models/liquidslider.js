import mongoose from 'mongoose';

const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const modelName = 'liquidslider';

const postSchema = new Schema({
    pic: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const Liquidslider = mongoose.models[modelName] || mongoose.model(modelName, postSchema);

export default Liquidslider;