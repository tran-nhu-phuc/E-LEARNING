import express from "express";
import { AdminService } from "../services/admins.service";
import { uploadAvatar } from "../configs/multerCloudinary.config";
import { StatusCode } from "../common/variableResponse.common";
import { MessageCodeResponse } from "../common/messageResponse.common";
import { Authorization } from "../middlewares/auth.middleware";
import { checkRole } from "../middlewares/checkRole.middleware";
import checkUsernameCreate from "../middlewares/checkUsernameCreate.middleware";

export const adminController = express.Router();
const adminService = new AdminService();
const msg = new MessageCodeResponse();
adminController

  // Login
  .post("/login", async (req: express.Request, res: express.Response) => {
    try {
        const { username, password } = req.body;
        const admin = await adminService.login(username, password);
        res.status(StatusCode.CREATED).json({msg: "LOGIN SUCCESS", admin});
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
  })
  // Create Admin
  .post(
    "/create",
    Authorization,
    checkRole,
    checkUsernameCreate,
    async (req: express.Request, res: express.Response) => {
      try {
        const form = req.body
        await adminService.create(form);
        res.status(StatusCode.CREATED).json({ msg: msg.CREATED("ADMIN") });
      } catch (error) {
        res
          .status(StatusCode.INTERNAL_SERVER_ERROR)
          .json({ msg: msg.INTERNAL_SERVER_ERROR("CREATE ADMIN") });
      }
    }
  )
  // Delete admin
  .delete(
    "/delete/:id",
    Authorization,
    checkRole,
    async (req: express.Request, res: express.Response) => {
      try {
        const adminId = Number(req.params.id);
        await adminService.delete(adminId);
        res.status(StatusCode.OK).json({ msg: msg.DELETE("ADMIN") });
      } catch (error) {
        res
          .status(StatusCode.INTERNAL_SERVER_ERROR)
          .json({ msg: msg.INTERNAL_SERVER_ERROR("DELETE ADMIN") });
      }
    }
  )
  // Update admin
  .patch(
    "/update/:id",
    Authorization,
    uploadAvatar.single("avatar"),
    async (req: express.Request, res: express.Response) => {
      try {
        const adminId = Number(req.params.id);
        const fileAvatar = req.file as Express.Multer.File;
        const avatar = fileAvatar.path;
        await adminService.update(adminId, avatar);
        res.status(StatusCode.OK).json({ msg: msg.UPDATE("ADMIN") });
      } catch (error) {
        res
          .status(StatusCode.INTERNAL_SERVER_ERROR)
          .json({ msg: msg.INTERNAL_SERVER_ERROR("UPDATE ADMIN") });
      }
    }
  )
  // Logout
  .get(
    "/logout",
    Authorization,
    async (req: express.Request, res: express.Response) => {
      try {
        req.session.destroy((error: any) => {
          if (error) {
            res.status(400).json({ msg: "SESSION DESTROY ERROR" });
          } else {
            res.status(StatusCode.OK).json({ msg: "LOGOUT SUCCESS" });
          }
        });
      } catch (error) {
        res
          .status(StatusCode.INTERNAL_SERVER_ERROR)
          .json({ msg: msg.INTERNAL_SERVER_ERROR("LOGOUT") });
      }
    }
  );
