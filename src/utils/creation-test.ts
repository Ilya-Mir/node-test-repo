import AppDataSource from "../data-source";
import {Cart} from "../entity/Cart";
import {Products} from "../entity/Products";
import {Users} from "../entity/Users";
import {CartItem} from "../entity/CartItem";


type NewCartItemData = {
  productId: number;
  count: number;
};

type NewCartData = {
  userId: number;
  items: NewCartItemData[];
};

export async function createNewCart(newCartData: NewCartData): Promise<Cart> {
  const cartRepository = AppDataSource.getRepository(Cart);
  const productRepository = AppDataSource.getRepository(Products);
  const cartItemRepository = AppDataSource.getRepository(CartItem);


  const newCart = new Cart();
  newCart.userId = newCartData.userId;
  newCart.isDeleted = false;

  let cartItems = []

  const cartItemsPromises = newCartData.items.map(async (itemData) => {
    const product = await productRepository.findOne({where: {id: itemData.productId.toString()}})
    if (!product) {
      throw new Error(`Product with id ${itemData.productId} not found`);
    }

    const newCartItem = new CartItem();
      newCartItem.product = product;
      newCartItem.count = itemData.count;
      cartItems.push(newCartItem);
  })

    await Promise.all(cartItemsPromises);

    newCart.items = cartItems

    console.warn(newCart);
    // Сохраняем объекты Cart и CartItem в репозитории и возвращаем новый объект Cart:
    const savedCart = await cartRepository.save(newCart);
    return savedCart;
  }
