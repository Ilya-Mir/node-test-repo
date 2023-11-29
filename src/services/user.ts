import {CartEntity} from "../schemas/cart.entity";


import {User, UserInfo} from "../schemas/user.entity";
import {Order} from "../schemas/order.entity";

export async function getUserById(userId: string): Promise<UserInfo> {
  const user = await User.findById(userId);

  return user;
}

export async function deleteUserData(userId: string) {
  const user = await User.findById(userId);

  if (user) {
    user.cart.isDeleted = true

    await user.save();


    return true;
  } else {
    return false;
  }
}

export async function updateUserData(userData: CartEntity, id: string): Promise<UserInfo> {
  const result = await User.findByIdAndUpdate(
      id,
      {cart: userData},
      {new: true}
  );
  return result
}

export async function calculateUserOrder(id: string) {
  const user = await getUserById(id);

  if (user) {
    const {cart} = user;

    const total = cart.items.reduce((sum, item) => {
      return sum + item.product.price * item.count;
    }, 0);

    const order = new Order({
      userId: id,
      total: total,
    });

    await order.save();
    return order;
  } else {
    return null
  }
}
