import { Course } from "../entities/courses.entity";
import { RatingCourse } from "../entities/ratingCourse.entity";
import { User } from "../entities/users.entity";

export class RateRepository {
  async create(form: any): Promise<void> {
    await RatingCourse.create(form);
  }
  async getOneRate(form: any) {
    return await RatingCourse.findOne({
      where: {
        userId: form.userId,
        courseId: form.courseId,
      },
    });
  }
}
