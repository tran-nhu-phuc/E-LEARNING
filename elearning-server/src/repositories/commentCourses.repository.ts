import { Op } from "sequelize";
import { MessageCodeResponse } from "../common/messageResponse.common";
import { StatusCode } from "../common/variableResponse.common";
import { CommentCourse } from "../entities/commentCourse.entity";
import { Course } from "../entities/courses.entity";
import { User } from "../entities/users.entity";
export class CommentCourseRepository {
  async create(form: any): Promise<any> {
    await CommentCourse.create(form);
  }


  async delete(id: number): Promise<number> {
    return await CommentCourse.destroy({ where: { id } });
  }

  async getAll(
    search: string,
    offset: number,
    limit: number,
    courseId: number | undefined
  ): Promise<any> {
    if (search !== "undefined") {
      return await CommentCourse.findAll({
        offset,
        limit,
        include: [{ model: User }, { model: Course }],
        where: {
          courseId,
          content: {
            [Op.like]: `%${search}%`,
          },
        },
        order: [["createdAt", "DESC"]],
      });
    } else {
      return await CommentCourse.findAll({
        offset,
        limit,
        include: [{ model: User }, { model: Course }],
        where: {
          courseId,
        },
        order: [["createdAt", "DESC"]],
      });
    }
  }

  async getCountComment(courseId: number) {
    return await CommentCourse.count({
      where: {
        courseId,
      },
    });
  }
}
