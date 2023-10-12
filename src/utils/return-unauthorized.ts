import {Response} from "express";

export const returnUnauthorized = (res: Response) => {
  res
      .status(401)
      .send({
        data: null,
        error: {
          "message": "User is not authorized"
        }
      })
}
