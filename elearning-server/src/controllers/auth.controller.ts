import express, { NextFunction } from "express";
import { AuthService } from "../services/auth.service";
import { IRegister } from "../types";
import checkEmailRegister from "../middlewares/checkEmailRegister.middleware";
import { StatusCode } from "../common/variableResponse.common";
import { MessageCodeResponse } from "../common/messageResponse.common";

export const authController = express.Router();
const authService = new AuthService();
const msg = new MessageCodeResponse();
authController
  .post(
    "/register",
    checkEmailRegister,
    async (req: express.Request, res: express.Response) => {
      try {
        const formRegister: IRegister = req.body;
        await authService.register(formRegister);
        res.status(StatusCode.CREATED).json({
          msg: msg.CREATED("REGISTER"),
        });
      } catch (error) {
        res
          .status(StatusCode.INTERNAL_SERVER_ERROR)
          .json({ msg: msg.INTERNAL_SERVER_ERROR("REGISTER") });
      }
    }
  )
  .post("/login", async (req: express.Request, res: express.Response) => {
    try {
      const { email, password } = req.body;
      const user = await authService.login(email, password);
      res.status(StatusCode.CREATED).json({ msg: "LOGIN SUCCESS", user });
    } catch (error: any) {
      if (error.status === 404) {
        res.status(error.status).json(error);
      } else if (error.status === 400) {
        res.status(error.status).json(error);
      } else {
        res
          .status(StatusCode.INTERNAL_SERVER_ERROR)
          .json({ msg: msg.INTERNAL_SERVER_ERROR("LOGIN") });
      }
    }
  });
