import { ProductEntity, product as bookProduct } from './product.entity'
import {Users} from "../entity/Users";

export interface CartItemEntity {
  product: ProductEntity;
  count: number;
}

export interface CartEntity {
  id: string; // uuid
  userId?: Users;
  isDeleted?: boolean;
  items: CartItemEntity[];
}

const cartItem: CartItemEntity = {
  product: bookProduct,
  count: 2,
}

// export const cart: CartEntity = {
//   id: "1",
//   userId: "2",
//   isDeleted: false,
//   items: [cartItem],
// }
