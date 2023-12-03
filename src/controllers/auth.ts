import {Request, Response} from "express";
import {regUserService} from "../services/auth";

export const regUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return { status: 400, message:'Email and password are required.'};
  }


  const result = await regUserService( email, password );

  if (result.status !== 201) {
    res.status(result.status)
        .send({error: result.message})
  } else {
    res.status(result.status)
        .send({data: {message: result.message, userid: result.userid}})
  }
}
