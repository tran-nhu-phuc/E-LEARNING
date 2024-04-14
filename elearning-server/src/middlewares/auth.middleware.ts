import express from "express";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { StatusCode } from "../common/variableResponse.common";
import { MessageCodeResponse } from "../common/messageResponse.common";
import { error } from "console";
config();
export const Authorization = (
  req: any,
  res: express.Response,
  next: express.NextFunction
) => {
  const msg = new MessageCodeResponse();
  try {
    const authorization = req.header("Authorization");
    if (!authorization) {
      return res
        .status(StatusCode.UNAUTHORIZED)
        .json({ msg: msg.UNAUTHORIZED() });
    }
    const tokenString = authorization.split(" ");
    if (tokenString.length !== 2 || tokenString[0] !== "Bearer") {
      return res
        .status(StatusCode.UNAUTHORIZED)
        .json({ msg: msg.UNAUTHORIZED() });
    }
    const token = tokenString[1];
    jwt.verify(token, "ELN", (err: any, user: any) => {
      if (err) {
        return res
          .status(StatusCode.UNAUTHORIZED)
          .json({ msg: msg.UNAUTHORIZED() });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    res
      .status(StatusCode.INTERNAL_SERVER_ERROR)
      .json({ msg: msg.INTERNAL_SERVER_ERROR("AUTHOR") });
  }
};
