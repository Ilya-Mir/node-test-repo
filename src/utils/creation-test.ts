import AppDataSource from "../data-source";
import {Cart} from "../entity/Cart";
import {Products} from "../entity/Products";
import {Users} from "../entity/Users";
import {CartItem} from "../entity/CartItem";


type NewCartItemData = {
  productId: string;
  count: number;
};

export async function createNewCart(input) {
  const userRepository = AppDataSource.getRepository(Users);
  const cartRepository = AppDataSource.getRepository(Cart);
  const productRepository = AppDataSource.getRepository(Products);


  // Проверка существования пользователя
  const user = await userRepository.findOne({ where: { id: input.userId } });
  if (!user) {
    throw new Error(`User with id "${input.userId}" not found.`);
  }

  // Получение списка продуктов по их ID
  const products = await Promise.all(
      input.items.map(async (item) => {
        const product = await productRepository.findOne({ where: { id: item.productId } });
        if (!product) {
          throw new Error(`Product with id "${item.productId}" not found.`);
        }
        return { product, count: item.count };
      })
  );

  // Создание новой корзины
  const newCart = new Cart();
  newCart.user = user;
  newCart.isDeleted = false;
  newCart.items = products.map(({ product, count }) => {
    const cartItem = new CartItem();
    cartItem.product = product;
    cartItem.count = count;
    return cartItem;
  });

  const savedCart = await cartRepository.save(newCart);
  return savedCart;
}


