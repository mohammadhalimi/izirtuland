import mongoose from 'mongoose';

const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const modelName = 'searchbar';

const postSchema = new Schema({
    search: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const SearchBar = mongoose.models[modelName] || mongoose.model(modelName, postSchema);

export default SearchBar;