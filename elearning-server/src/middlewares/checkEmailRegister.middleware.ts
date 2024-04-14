import express, { NextFunction } from "express";
import { UserRepository } from "../repositories/users.repository";
import { StatusCode } from "../common/variableResponse.common";
import { MessageCodeResponse } from "../common/messageResponse.common";
const userRepository = new UserRepository();
const checkEmailRegister = async (
  req: any | express.Request,
  res: express.Response,
  next: NextFunction
) => {
  const msg = new MessageCodeResponse();
  try {
    const email = req.body.email;
    const result = await userRepository.getUserEmail(email);
    if (result) {
      res.status(StatusCode.NOT_FOUND).json({ msg: msg.IS_EXISTING("EMAIL") });
    } else {
      next();
    }
  } catch (error) {
    res
      .status(StatusCode.INTERNAL_SERVER_ERROR)
      .json({ msg: msg.INTERNAL_SERVER_ERROR("CHECK EMAIL REGISTER") });
  }
};

export default checkEmailRegister;
