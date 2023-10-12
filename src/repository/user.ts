import {userEntity, user, UserEntity, UserInfo, user2} from "../schemas/user.entity";
import {CartEntity} from "../schemas/cart.entity";

const usersIds: UserEntity[] = [
  userEntity
]

let usersInfo: UserInfo[] = [
  user,
  user2
]

export const getUser = (userId: string) => {
  return usersInfo.find((userInfo) => userInfo.cart.userId ===  userId);
}


export const updateUser = (userBody: CartEntity, userId: string) => {
  const changedUser = usersInfo.find(userInfo => userInfo.cart.userId === userId);
  changedUser.cart = {
    ...changedUser.cart,
    ...userBody
  }
  return changedUser
}

export const deleteUser = (userId: string) => {
  const changedUser = usersInfo.find(userInfo => userInfo.cart.userId === userId);
  changedUser.cart = {
    ...changedUser.cart,
    isDeleted: true
  }
  return true
}

export const checkoutUser = (userId: string) => {
  const changedUser = usersInfo.find(userInfo => userInfo.cart.userId === userId);
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
