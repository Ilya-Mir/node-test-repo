import {User, UserInfo} from "../schemas/user.entity";

export const hideDeleteUserStatus = (user: UserInfo): UserInfo => {
  const userObject = user.toObject(); // конвертируем user в обычный объект
  const { cart, ...userWithoutCart } = userObject;
  const { isDeleted, ...cartWithoutDeletedStatus } = cart;

  // Создает новый (ваш конструктор может отличаться)
  const newUser = new User({
    ...userWithoutCart,
    cart: {
      ...cartWithoutDeletedStatus,
    },
  });

  return newUser;
};

