import {UserInfo} from "../schemas/user.entity";

export const hideDeleteUserStatus = (user: UserInfo): UserInfo => {
  const { isDeleted, ...userCartWithoutDeletedStatus} = user.cart;
  return {
    ...user, cart: {
      ...userCartWithoutDeletedStatus
    }
  }
}
