import {UserInfo} from "../schemas/user.entity";

export const hideDeleteUserStatus = (user: UserInfo): UserInfo => {
  const { ...userWithoutDeletedStatus} = user;
  delete userWithoutDeletedStatus?.cart?.isDeleted
  return userWithoutDeletedStatus
}
