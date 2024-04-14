import { Op } from "sequelize";
import { RegisteredCourse } from "../entities/registeredCourse.entity";
import sequelize from "../configs/db.config";
import { Course } from "../entities/courses.entity";
import { User } from "../entities/users.entity";
import { LessonUser } from "../entities/lessonsUser.entity";

export class RegisterCourseRepository {
  async create(form: any): Promise<void> {
    await RegisteredCourse.create(form);
  }

  async getAll(
    keySort: string,
    search: string,
    sort: string,
    offset: number,
    limit: number
  ): Promise<any> {
    if (search === "undefined" && sort === "undefined") {
      return await RegisteredCourse.findAll({
        include: [{ model: User }, { model: Course }],
        offset: offset,
        limit: limit,
      });
    }
    if (search !== "undefined" && sort === "undefined") {
      return await RegisteredCourse.findAll({
        include: [
          {
            model: User,
            where: {
              [Op.or]: {
                firstName: {
                  [Op.like]: `%${search}%`,
                },
                lastName: {
                  [Op.like]: `%${search}%`,
                },
              },
            },
          },
          { model: Course },
        ],
        offset: offset,
        limit: limit,
      });
    }
    if (search === "undefined" && sort !== "undefined") {
      return await RegisteredCourse.findAll({
        include: [{ model: User }, { model: Course }],
        offset: offset,
        limit: limit,
        order: [[keySort, sort]],
      });
    }
    if (search !== "undefined" && sort !== "undefined") {
      return await RegisteredCourse.findAll({
        include: [
          {
            model: User,
            where: {
              [Op.or]: {
                firstName: {
                  [Op.like]: `%${search}%`,
                },
                lastName: {
                  [Op.like]: `%${search}%`,
                },
              },
            },
          },
          { model: Course },
        ],
        offset: offset,
        limit: limit,
        order: [[keySort, sort]],
      });
    }
  }

  async revenue(month: string, year: string, quarter: string) {
    if (month !== "undefined" && year !== "undefined") {
      return await sequelize.query(
        `select * from project_elearning.registeredCourses where month(registeredCourses.createdAt) = ${month} and year(registeredCourses.createdAt) = ${year};`
      );
    } else if (
      year !== "undefined" &&
      quarter === "undefined" &&
      month === "undefined"
    ) {
      return await sequelize.query(
        `select * from project_elearning.registeredCourses where year(registeredCourses.createdAt) = ${year};`
      );
    } else if (quarter !== "undefined" && year !== "undefined") {
      if (quarter === "1") {
        return await sequelize.query(
          `select * from project_elearning.registeredCourses where year(registeredCourses.createdAt) = ${year} and month(registeredCourses.createdAt) in (1,2,3)`
        );
      } else if (quarter === "2") {
        return await sequelize.query(
          `select * from project_elearning.registeredCourses where year(registeredCourses.createdAt) = ${year} and month(registeredCourses.createdAt) in (4,5,6)`
        );
      } else if (quarter === "3") {
        return await sequelize.query(
          `select * from project_elearning.registeredCourses where year(registeredCourses.createdAt) = ${year} and month(registeredCourses.createdAt) in (7,8,9)`
        );
      } else if (quarter === "4") {
        return await sequelize.query(
          `select * from project_elearning.registeredCourses where year(registeredCourses.createdAt) = ${year} and month(registeredCourses.createdAt) in (10,11,12)`
        );
      }
    }
  }

  async getByUser(userId: number) {
    return await RegisteredCourse.findAll({
      include: [{ model: User }, { model: Course }, { model: LessonUser }],
      where: { userId },
    });
  }

  async finishLesson(
    userId: number,
    courseId: number,
    completedLessons: number
  ) {
    await RegisteredCourse.update(
      { completedLessons },
      { where: { [Op.and]: { userId, courseId } } }
    );
  }

  async getRegisteredId(form: any) {
    return await RegisteredCourse.findAll({
      where: form,
      include: [
        { model: User },
        { model: Course },
        { model: LessonUser, attributes: { exclude: ["id"] } },
      ],
    });
  }
}
