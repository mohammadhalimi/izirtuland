import mongoose from 'mongoose';

const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const modelName = 'FooterMobile';

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

const FooterMobile = mongoose.models[modelName] || mongoose.model(modelName, postSchema);

export default FooterMobile;