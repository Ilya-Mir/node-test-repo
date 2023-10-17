import {userEntity, user, UserEntity, UserInfo, user2} from "../schemas/user.entity";
import {CartEntity} from "../schemas/cart.entity";
import {OrderEntity} from "../schemas/order.entity";

const usersIds: UserEntity[] = [
  userEntity
]

let usersInfo: UserInfo[] = [
  user,
  user2
]

export const getUser = (userId: string): UserInfo  => {
  return usersInfo.find((userInfo) => userInfo.cart.userId ===  userId);
}


export const updateUser = (userBody: CartEntity, userId: string): UserInfo => {
  const changedUser = usersInfo.find(userInfo => userInfo.cart.userId === userId);

  if (!changedUser) {
    throw new Error("User not found")
  }

  changedUser.cart = {
    ...changedUser.cart,
    ...userBody
  }
  return changedUser
}

export const deleteUser = (userId: string): boolean  => {
  const changedUser = usersInfo.find(userInfo => userInfo.cart.userId === userId);

  if (!changedUser) {
    return false
  }

  changedUser.cart = {
    ...changedUser.cart,
    isDeleted: true
  }
  return true
}

export const calculateUser = (userId: string): { order: OrderEntity} | false => {
  const changedUser = usersInfo.find(userInfo => userInfo.cart.userId === userId);

  if (!changedUser) {
    return false
  }

  return {
    "order": {
      ...changedUser.cart,
      "payment": {
        "type": "paypal",
        "address": "London",
        "creditCard": "1234-1234-1234-1234"
      },
      "delivery": {
        "type": "post",
        "address": "London"
      },
      "comments": "",
      "status": "created",
      "total": 500
    }
  }
}
