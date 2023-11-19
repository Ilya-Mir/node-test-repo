import {calculateUserOrder, deleteCartByUserId, getCartById, updateUserData} from "../services/user";
import {Request, Response} from "express";
import {hideDeleteUserStatus} from "../utils/hide-delete-status";
import {ID_HEADER_NAME} from "../constants";
import {createNewCart} from "../utils/creation-test";
import {Users} from "../entity/Users";

export const getCartByUserID = async (req: Request, res: Response) => {
  const id = req.get(ID_HEADER_NAME)
  const result = await getCartById(id);

  if (!result) {
    res
        .status(404)
        .send({data: null, error: {message: "Not found"}});
  }


  const undeletedCart = result.find(carts => carts.isDeleted === false)

  const user = {
    cart: undeletedCart,
    total: undeletedCart?.items.reduce((partialSum, a) => partialSum + a.product.price, 0)
  }

  res
      .status(200)
      .send({data: undeletedCart ? hideDeleteUserStatus(user) : user, error: null});

}

export const updateUser = async (req: Request, res: Response) => {
  const id = req.get(ID_HEADER_NAME)

  const result = await updateUserData(req.body, id)

  const undeletedCart = result.find(carts => carts.isDeleted === false)

  const user = {
    cart: undeletedCart,
    total: undeletedCart?.items.reduce((partialSum, a) => partialSum + a.product.price, 0)
  }

  if (result) {
    res
        .status(200)
        .send({data: hideDeleteUserStatus(user), error: null});
  } else {
    res
        .status(404)
        .send({data: null, error: {message: "Users not update"}});
  }
}

export const removeUser = async (req: Request, res: Response) => {
  const id = req.get(ID_HEADER_NAME)

  const result = await deleteCartByUserId(req.body.id, id)

  if (result) {
    res
        .status(200)
        .send({
          data: true,
          error: null
        });
  } else {
    res
        .status(404)
        .send({data: null, error: {message: "Users not found"}});
  }
}

export const calculateUser = async (req: Request, res: Response) => {
  const id = req.get(ID_HEADER_NAME)


  const result = calculateUserOrder(id)

  if (result) {
    res
        .status(200)
        .send({data: result, error: null});
  } else {
    res
        .status(400)
        .send({data: null, error: {message: "Cart is empty"}});
  }
}
