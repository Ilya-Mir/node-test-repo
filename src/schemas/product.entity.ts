import mongoose, {Schema} from "mongoose";

export interface ProductEntity {
  title: string;
  description: string;
  price: number;
}

export const ProductSchema = new Schema<ProductEntity>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
});

export const Product = mongoose.model('Product', ProductSchema);
