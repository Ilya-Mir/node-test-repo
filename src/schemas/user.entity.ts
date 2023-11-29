import {CartEntity, CartSchema} from "./cart.entity";
import mongoose, {Schema, Document} from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface UserInfo extends Document {
  id: string;
  email: string;
  password: string;
  role: "admin" | "user";
  cart: CartEntity;
}


export const UserInfoSchema = new Schema<UserInfo>({
  id: {
    type: String,
    default: uuidv4,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  cart: { type: CartSchema },
});

export const User = mongoose.model('User', UserInfoSchema);
