import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    package: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    }
});

// جلوگیری از تعریف مجدد مدل
export default mongoose.models.Tobuy || mongoose.model('Tobuy', productSchema);

