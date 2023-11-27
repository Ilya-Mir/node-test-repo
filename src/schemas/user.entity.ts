import {CartEntity, CartSchema} from "./cart.entity";
import mongoose, {Schema, Document} from "mongoose";

export interface UserEntity {
  id: string; // uuid
}

export interface UserInfo extends Document {
  cart: CartEntity;
}


export const UserInfoSchema = new Schema<UserInfo>({
  cart: { type: CartSchema },
});

export const User = mongoose.model('User', UserInfoSchema);
