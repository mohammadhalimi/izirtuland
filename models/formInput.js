import mongoose from 'mongoose';

const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const modelName = 'formInput';

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

const FormInput = mongoose.models[modelName] || mongoose.model(modelName, postSchema);

export default FormInput;