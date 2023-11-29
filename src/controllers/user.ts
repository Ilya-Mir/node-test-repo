import {calculateUserOrder, deleteUserData, getUserById, updateUserData} from "../services/user";
import {Request, Response} from "express";
import {hideDeleteUserStatus} from "../utils/hide-delete-status";
import {ID_HEADER_NAME} from "../constants";

export const getUser = async (req: Request, res: Response) => {
  const id = req.get(ID_HEADER_NAME)
  const user = await getUserById(id);


  if (!user) {
    res
        .status(404)
        .send({data: null, error: {message: "Not found"}});
  }
  res
      .status(200)
      .send({data: hideDeleteUserStatus(user), error: null});

}

export const updateUser = async (req: Request, res: Response) => {
  const id = req.get(ID_HEADER_NAME)

  const result = await updateUserData(req.body, id)

  if (result) {
    res
        .status(200)
        .send({data: hideDeleteUserStatus(result), error: null});
  } else {
    res
        .status(404)
        .send({data: null, error: {message: "User not update"}});
  }
}

export const removeUser = (req: Request, res: Response) => {
  const id = req.get(ID_HEADER_NAME)

  const result = deleteUserData(id)

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
        .send({data: null, error: {message: "User not found"}});
  }
}

export const calculateUser = async (req: Request, res: Response) => {
  const id = req.get(ID_HEADER_NAME)

  const result = await calculateUserOrder(id)

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
