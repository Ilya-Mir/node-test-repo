import {CartEntity} from "./cart.entity";

export interface UserEntity {
  id: string; // uuid
}

export const userEntity: UserEntity = {
  id: '0fe36d16-49bc-4aab-a227-f84df899a6cb'
}

export interface UserInfo {
  cart: CartEntity,
  total: number
}
