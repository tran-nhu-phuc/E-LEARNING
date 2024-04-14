import express from "express";
import { CourseService } from "../services/courses.service";
import { uploadImage } from "../configs/multerCloudinary.config";
import { StatusCode } from "../common/variableResponse.common";
import { MessageCodeResponse } from "../common/messageResponse.common";
import { Authorization } from "../middlewares/auth.middleware";
import { checkRole } from "../middlewares/checkRole.middleware";
export const courseController = express.Router();
const courseService = new CourseService();
const msg = new MessageCodeResponse();
courseController
  // Create Course
  .post(
    "/create",
    Authorization,
    checkRole,
    uploadImage.single("image"),
    async (req: express.Request, res: express.Response) => {
      try {
        const formCourse = {
          ...req.body,
          categoryId: Number(req.body.categoryId),
          level: Number(req.body.level),
          price: Number(req.body.price),
        };
        const fileImage = req.file as Express.Multer.File;
        await courseService.createCourse(formCourse, fileImage);
        res.status(StatusCode.CREATED).json({ msg: msg.CREATED("COURSE") });
      } catch (error) {
        res
          .status(StatusCode.INTERNAL_SERVER_ERROR)
          .json({ msg: msg.INTERNAL_SERVER_ERROR("COURSE") });
      }
    }
  )
  // Delete Course
  .delete(
    "/delete/:id",
    Authorization,
    checkRole,
    async (req: express.Request, res: express.Response) => {
      try {
        const id = Number(req.params.id);
        await courseService.deleteCourse(id);
        res.status(StatusCode.OK).json({ msg: msg.DELETE("COURSE") });
      } catch (error: any) {
        if (error.status === 404) {
          res.status(error.status).json({ msg: error.msg });
        } else {
          res
            .status(StatusCode.INTERNAL_SERVER_ERROR)
            .json({ msg: msg.INTERNAL_SERVER_ERROR("COURSE DELETE") });
        }
      }
    }
  )
  // Update Course
  .patch(
    "/update/:id",
    Authorization,
    uploadImage.single("image"),
    async (req: express.Request, res: express.Response) => {
      try {
        const id = Number(req.params.id);
        const fileImage = req.file as Express.Multer.File;
        const formUpdate = req.body;
        await courseService.updateCourse(id, formUpdate, fileImage);
        res.status(StatusCode.OK).json({ msg: msg.UPDATE("COURSE") });
      } catch (error: any) {
        if (error.status === 404) {
          res.status(error.status).json({ msg: error.msg });
        } else {
          res
            .status(StatusCode.INTERNAL_SERVER_ERROR)
            .json({ msg: msg.INTERNAL_SERVER_ERROR("COURSE UPDATE") });
        }
      }
    }
  )
  //   Get Courses (search, sort, page)
  .get("/get-all", async (req: express.Request, res: express.Response) => {
    try {
      const search = String(req.query.search) || "";
      const sort = String(req.query.sort) || "";
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 5;
      const keySort = String(req.query.key);
      const role = String(req.query.role);
      const result = await courseService.getAllCourses(
        role,
        keySort,
        search,
        sort,
        page,
        limit
      );
      res.status(StatusCode.OK).json({ msg: msg.GET("COURSES"), data: result });
    } catch (error) {
      res
        .status(StatusCode.INTERNAL_SERVER_ERROR)
        .json({ msg: msg.INTERNAL_SERVER_ERROR("GET ALL COURSES") });
    }
  })
  // Detail course
  .get("/detail/:id", async (req: express.Request, res: express.Response) => {
    try {
      const courseId = Number(req.params.id);
      const result = await courseService.getDetailCourse(courseId);
      res
        .status(StatusCode.OK)
        .json({ msg: msg.GET("COURSE DETAIL"), data: result });
    } catch (error: any) {
      if (error.status === 404) {
        res.status(error.status).json({ msg: error.msg });
      } else {
        res
          .status(StatusCode.INTERNAL_SERVER_ERROR)
          .json({ msg: msg.INTERNAL_SERVER_ERROR("GET DETAIL COURSE") });
      }
    }
  });
