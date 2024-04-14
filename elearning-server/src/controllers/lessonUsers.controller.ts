import express from "express";

import { StatusCode } from "../common/variableResponse.common";
import { MessageCodeResponse } from "../common/messageResponse.common";
import { LessonUserService } from "../services/lessonUsers.service";

export const lessonUserController = express.Router();
const lessonUserService = new LessonUserService();
const msg = new MessageCodeResponse();
lessonUserController
  .post("/create", async (req: express.Request, res: express.Response) => {
    try {
      const form = req.body;
      await lessonUserService.createLessonUser(form);
      res.status(StatusCode.CREATED).json({ msg: msg.CREATED("LESSON USER") });
    } catch (error) {
      
      res
        .status(StatusCode.INTERNAL_SERVER_ERROR)
        .json({ msg: msg.INTERNAL_SERVER_ERROR("CREATE LESSON OF USER") });
    }
  })
  .patch(
    "/finished-lesson",
    async (req: express.Request, res: express.Response) => {
      try {
        const form = req.body;
        await lessonUserService.finishedLesson(form);
        res
          .status(StatusCode.OK)
          .json({ msg: msg.UPDATE("STATE LESSON USER") });
      } catch (error:any) {
        res
          .status(StatusCode.INTERNAL_SERVER_ERROR)
          .json({ msg: msg.INTERNAL_SERVER_ERROR("UPDATE LESSON USER") });
      }
    }
  );
