import { Op } from "sequelize";
import { Course } from "../entities/courses.entity";
import { Lesson } from "../entities/lessons.entity";
import { Category } from "../entities/categories.entity";
import { RatingCourse } from "../entities/ratingCourse.entity";

export class CourseRepository {
  async createCourse(formCourse: any): Promise<void> {
    await Course.create(formCourse);
  }
  async deleteCourse(id: number): Promise<number> {
    return await Course.destroy({ where: { id } });
  }

  async updateCourse(id: number, formUpdate: any): Promise<number[]> {
    return await Course.update(formUpdate, { where: { id } });
  }

  async getAllCourses(
    role: string,
    keySort: string,
    offset: number,
    limit: number,
    search: string,
    sort: string
  ): Promise<any> {
    if (role === "user") {
      if (search !== "undefined") {
        return await Course.findAll({
          include: { model: RatingCourse },
          where: {
            courseName: {
              [Op.like]: `%${search}%`,
            },
          },
        });
      } else if (search === "undefined") {
        return await Course.findAll({
          include: { model: RatingCourse },
        });
      }
    } else if (role === "admin") {
      if (search === "undefined" && sort === "undefined") {
        return await Course.findAll({
          include: { model: RatingCourse },
          offset: offset,
          limit: limit,
        });
      }
      if (search !== "undefined" && sort === "undefined") {
        return await Course.findAll({
          include: { model: RatingCourse },
          offset: offset,
          limit: limit,
          where: {
            courseName: {
              [Op.like]: `%${search}%`,
            },
          },
        });
      }
      if (search === "undefined" && sort !== "undefined") {
        return await Course.findAll({
          include: { model: RatingCourse },
          offset: offset,
          limit: limit,
          order: [[keySort, sort]],
        });
      }
      if (search !== "undefined" && sort !== "undefined") {
        return await Course.findAll({
          include: { model: RatingCourse },
          offset: offset,
          limit: limit,
          where: {
            courseName: {
              [Op.like]: `%${search}%`,
            },
          },
          order: [[keySort, sort]],
        });
      }
    }
  }

  async getDetailCourse(id: number): Promise<any> {
    return await Course.findOne({
      include: [
        { model: Lesson },
        { model: Category },
        { model: RatingCourse },
      ],
      where: {
        id: id,
      },
    });
  }
}
