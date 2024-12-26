import mongoose from 'mongoose';

const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const modelName = 'userpass';

const postSchema = new Schema({
    username: String,
    password: String,
}, { timestamps: true });

const UserPass = mongoose.models[modelName] || mongoose.model(modelName, postSchema);

export default UserPass;