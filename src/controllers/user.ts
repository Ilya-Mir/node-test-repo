import {checkoutUserData, deleteUserData, getUserById, updateUserData} from "../services/user";
import {Request, Response} from "express";
import {returnUnauthorized} from "../utils/return-unauthorized";
import {hideDeleteStatus} from "../utils/hide-delete-status";

export const ID_HEADER_NAME = "x-user-id"

export const getUserHandler = (req: Request, res: Response) => {
  const id = req.get(ID_HEADER_NAME)
  const user = id && getUserById(id);


  if (!user) {
    returnUnauthorized(res)
    return;
  }

  res
      .status(200)
      .send({data: hideDeleteStatus(user), error: null});
}

export const updateUserHandler = (req: Request, res: Response) => {
  const id = req.get(ID_HEADER_NAME)

  const user = id && getUserById(id);


  if (!user) {
    returnUnauthorized(res)
    return;
  }

  const result = id && updateUserData(req.body, id)

  // @ts-ignore
  if (result?.error) {
    res
        .status(400)
        // @ts-ignore
        .send({data: null, error: {message: result?.value}});
    return;
  }

  res
      .status(200)
      .send({data: hideDeleteStatus(result), error: null});
}

export const removeUserHandler = (req: Request, res: Response) => {
  const id = req.get(ID_HEADER_NAME)

  const user = getUserById(id);


  if (!user) {
    returnUnauthorized(res)
    return;
  }

  const result = deleteUserData(id)

  if (result) {
    res
        .status(200)
        .send({
          data: true,
          error: null
        });
    return;
  }
}

export const checkoutHandler = (req: Request, res: Response) => {
  const id = req.get(ID_HEADER_NAME)

  const user = getUserById(id);


  if (!user) {
    returnUnauthorized(res);
    return;
  }

  const result = checkoutUserData(id)

  res
      .status(200)
      .send({data: hideDeleteStatus(result), error: null});
}
