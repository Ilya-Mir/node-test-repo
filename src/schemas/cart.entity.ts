import {ProductEntity, ProductSchema} from './product.entity'
import mongoose, {Schema, Document} from "mongoose";

export interface CartItemEntity {
  product: ProductEntity;
  count: number;
}

export interface CartEntity extends Document {
  userId?: string;
  isDeleted?: boolean;
  items: CartItemEntity[];
}

export const CartItemSchema = new Schema<CartItemEntity>({
  product: { type: ProductSchema, required: true },
  count: { type: Number, required: true },
});

export const CartSchema = new Schema<CartEntity>({
  userId: { type: String },
  isDeleted: { type: Boolean, default: false },
  items: { type: [CartItemSchema], default: [] },
});

export const CartItem = mongoose.model('CartItem', CartItemSchema);
export const Cart = mongoose.model('Cart', CartSchema);
