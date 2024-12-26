import mongoose from 'mongoose';

const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const modelName = 'usermenu';

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    component: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const UserMenu = mongoose.models[modelName] || mongoose.model(modelName, postSchema);

export default UserMenu;