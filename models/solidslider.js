import mongoose from 'mongoose';

const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const modelName = 'solidslider';

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

const SolidSlider = mongoose.models[modelName] || mongoose.model(modelName, postSchema);

export default SolidSlider;