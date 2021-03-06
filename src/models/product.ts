import mongoose, { Schema } from 'mongoose';
import IProduct from '../interfaces/product';
import logging from '../config/logging';

const ProductSchema: Schema = new Schema(
  {
    name: { type: String, required: true, min: 2, max: 50 },
    brand: { type: String, required: true, min: 2, max: 50 },
    corporation: { type: String, required: true, min: 2, max: 50 },
    barcode: { type: String, required: true, min: 2, max: 50 },
    state: { type: String, required: true, min: 2, max: 50 },
    extraInformation: { type: String }
  },
  {
    timestamps: true
  }
);

// modifying the data after it's created and log it
ProductSchema.post<IProduct>('save', function () {
  (this.extraInformation =
    'this is some extra info we want to put into this entry after the save.'),
    logging.info('Mongo', 'Checkout the product we just saved: ', this);
});

export default mongoose.model<IProduct>('Product', ProductSchema);
