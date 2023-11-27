import {CartItemEntity, CartItemSchema} from './cart.entity';
import mongoose, { Schema, Document } from 'mongoose';
type ORDER_STATUS = 'created' | 'completed';

export interface OrderEntity extends Document {
  delivery: { address: string; type: string };
  total: number;
  comments: string;
  isDeleted?: boolean;
  payment: { address: string; type: string; creditCard: string };
  userId?: string;
  items: CartItemEntity[];
  status: ORDER_STATUS
}

export const OrderSchema = new Schema<OrderEntity>({
  delivery: { address: String, type: String },
  total: { type: Number, required: true },
  comments: { type: String },
  isDeleted: { type: Boolean, default: false },
  payment: {
    address: String,
    type: String,
    creditCard: String,
  },
  userId: { type: String },
  items: { type: [CartItemSchema], default: [] },
  status: { type: String, default: "created" },
});

export const Order = mongoose.model('Order', OrderSchema);
