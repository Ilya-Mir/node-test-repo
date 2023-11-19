import {CartEntity} from "../schemas/cart.entity";


import AppDataSource from "../data-source";
import {Cart} from "../entity/Cart";
import {Users} from "../entity/Users";
import {CartItem} from "../entity/CartItem";
import {getConnection} from "typeorm";
import {Order} from "../entity/Order";

export async function getCartById(userId: string | Users) {
  const cartRepository = AppDataSource.getRepository(Cart);
  const userCart = await cartRepository.find({where: {user: {id: userId} as Users}, relations: ["items", "items.product"]});
  return userCart
}

export async function deleteCartByUserId(cartId: string, userId: string) {
  const userRepository =  AppDataSource.getRepository(Users);
  const cartRepository =  AppDataSource.getRepository(Cart);

  // Проверка существования пользователя
  const user = await userRepository.findOne({ where: { id: userId } });
  if (!user) {
    throw new Error(`User with id "${userId}" not found.`);
  }

  // Найти корзину пользователя
  const cart = await cartRepository.findOne({
    where: {
      id: cartId,
      user
    }
  });

  if (!cart) {
    throw new Error(`Cart with id "${cartId}" for user with id "${userId}" not found.`);
  }

  // Установить флаг isDeleted в true и сохранить изменения
  cart.isDeleted = true;
  await cartRepository.save(cart);

  return cart;
}

export async function updateUserData(newCartEntity: CartEntity, userId: string): Promise<Cart[]> {
  const cartRepository = AppDataSource.getRepository(Cart);
  const userRepository = AppDataSource.getRepository(Users);

  // Найдите Cart для данного пользователя
  const user = await userRepository.findOne({where: {id: userId}});
  if (!user) {
    throw new Error("User not found");
  }

  const userCart = await cartRepository.findOne({ where: { user: user } });
  if (!userCart) {
    throw new Error("Cart not found for the given user");
  }

  // Удаляем все текущие элементы корзины для данного пользователя
  await AppDataSource
      .createQueryBuilder()
      .delete()
      .from(CartItem)
      .where("cartId = :cartId", { cartId: userCart.id })
      .execute();

  // Создаем и сохраняем новые элементы корзины
  const newCartItems = newCartEntity.items.map((item) => {
    const cartItem = new CartItem();
    cartItem.cart = userCart;
    cartItem.product = item.product;
    cartItem.count = item.count;
    return cartItem;
  });

  await AppDataSource.manager.save(newCartItems);

  const newUserCart = await cartRepository.find({where: {user: {id: userId} as Users}, relations: ["items", "items.product"]});

  return newUserCart

}

export async function calculateUserOrder(userId: string) {
  const userRepository = AppDataSource.getRepository(Users);
  const orderRepository = AppDataSource.getRepository(Order);
  const cartRepository = AppDataSource.getRepository(Cart);

  // Проверка существования пользователя
  const user = await userRepository.findOne({ where: { id: userId } });
  if (!user) {
    throw new Error(`User with id "${userId}" not found.`);
  }

  // Найти корзину пользователя
  const cart = await cartRepository.findOne({
    where: { user },
    relations: ['items', 'items.product'],
  });

  if (!cart) {
    throw new Error(`Cart for user with id "${userId}" not found.`);
  }

  // Вычислить общую стоимость заказа
  const total = cart.items.reduce(
      (sum, item) => sum + item.product.price * item.count,
      0
  );

  // Создать и сохранить новый заказ
  const newOrder = orderRepository.create({
    user,
    total,
    payment: '',
    delivery: '',
    comments: '',
    status: 'created',
  });

  const savedOrder = await orderRepository.save(newOrder);

  // Удалить ссылку на корзину из товаров корзины и связать их с новым заказом
  cart.items.forEach(item => {
    item.cart = null;
    item.order = savedOrder;
  });

  return newOrder;
}
