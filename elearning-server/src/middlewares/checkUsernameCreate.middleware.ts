import express, { NextFunction } from "express";
import { AdminRepository } from "../repositories/admins.repository"
import { StatusCode } from "../common/variableResponse.common";
import { MessageCodeResponse } from "../common/messageResponse.common";
const adminRepository = new AdminRepository();
const checkUsernameCreate = async (
  req: any | express.Request,
  res: express.Response,
  next: NextFunction
) => {
  const msg = new MessageCodeResponse();
  try {
    const username = req.body.username;
    const result = await adminRepository.getAdminByUsername(username);
    if (result) {
      res.status(StatusCode.NOT_FOUND).json({ msg: msg.IS_EXISTING("USERNAME") });
    } else {
      next();
    }
  } catch (error) {
    res
      .status(StatusCode.INTERNAL_SERVER_ERROR)
      .json({ msg: msg.INTERNAL_SERVER_ERROR("CHECK USERNAME CREATE") });
  }
};

export default checkUsernameCreate;
