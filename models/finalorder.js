import mongoose from 'mongoose';

const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const ItemSchema = new Schema({
  id: { type: Number, required: true },
  brand: { type: String, required: true },
  package: { type: String, required: true },
  title: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: String, required: true },
  totalPrice: { type: String, required: true },
});

const FinalOrderSchema = new Schema(
  {
    items: [ItemSchema], // Embedding the items array
    totalAmount: { type: String, required: true },
    userPhone: { type: String, required: true },
    trackId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const FinalOrder = mongoose.models.finalorder || mongoose.model('finalorder', FinalOrderSchema);

export default FinalOrder;
