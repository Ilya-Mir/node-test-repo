import {UserInfo} from "../schemas/user.entity";

export const hideDeleteStatus = (user: any) => {
  return delete user.cart.isDeleted
}
