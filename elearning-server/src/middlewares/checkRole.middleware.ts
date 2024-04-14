import express, { NextFunction } from "express";
import { StatusCode } from "../common/variableResponse.common";
import { MessageCodeResponse } from "../common/messageResponse.common";
const msg = new MessageCodeResponse();
export const checkRole = (
  req: express.Request | any,
  res: express.Response,
  next: NextFunction
) => {
  try {
    const admin = req.user;
    if (admin.role === 0) {
      next();
    } else {
      res.status(StatusCode.FORBIDDEN).json({ msg: msg.FORBIDDEN() });
    }
  } catch (error) {
    res
      .status(StatusCode.INTERNAL_SERVER_ERROR)
      .json({ msg: msg.INTERNAL_SERVER_ERROR("CHECK ROLE") });
  }
};
