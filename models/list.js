import mongoose from 'mongoose';

const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const modelName = 'list';

const postSchema = new Schema({
    telephone: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const List = mongoose.models[modelName] || mongoose.model(modelName, postSchema);

export default List;