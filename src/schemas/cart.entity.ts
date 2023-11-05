import { ProductEntity, product as bookProduct } from './product.entity'

export interface CartItemEntity {
  product: ProductEntity;
  count: number;
}

export interface CartEntity {
  id: number; // uuid
  userId?: number;
  isDeleted?: boolean;
  items: CartItemEntity[];
}

const cartItem: CartItemEntity = {
  product: bookProduct,
  count: 2,
}

export const cart: CartEntity = {
  id: 1,
  userId: 2,
  isDeleted: false,
  items: [cartItem],
}
