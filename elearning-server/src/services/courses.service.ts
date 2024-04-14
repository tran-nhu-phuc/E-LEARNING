import { MessageCodeResponse } from "../common/messageResponse.common";
import { StatusCode } from "../common/variableResponse.common";
import { CourseRepository } from "../repositories/courses.repository";
import { ICourse } from "../types";
const msg = new MessageCodeResponse();
export class CourseService {
  private _courseRepository: CourseRepository;
  constructor() {
    this._courseRepository = new CourseRepository();
  }

  async createCourse(
    formCourse: ICourse,
    fileImage: Express.Multer.File
  ): Promise<void> {
    const newForm = {
      ...formCourse,
      image: fileImage.path,
    };
    await this._courseRepository.createCourse(newForm);
  }

  async deleteCourse(id: number): Promise<void> {
    const result = await this._courseRepository.deleteCourse(id);
    if (result === 0) {
      throw {
        status: StatusCode.NOT_FOUND,
        msg: msg.NOT_FOUND("ID COURSE"),
      };
    }
  }

  async updateCourse(
    id: number,
    formUpdate: any,
    fileImage?: Express.Multer.File
  ): Promise<any> {
    if (fileImage) {
      const newForm = {
        ...formUpdate,
        image: fileImage.path,
      };
      const result = await this._courseRepository.updateCourse(id, newForm);
      if (result[0] === 0) {
        throw {
          status: StatusCode.NOT_FOUND,
          msg: msg.NOT_FOUND("ID COURSE"),
        };
      }
    } else {
      const result = await this._courseRepository.updateCourse(id, formUpdate);
      if (result[0] === 0) {
        throw {
          status: StatusCode.NOT_FOUND,
          msg: msg.NOT_FOUND("ID COURSE"),
        };
      }
    }
  }

  async getAllCourses(
    role: string,
    keySort: string,
    search: string,
    sort: string,
    page: number,
    limit: number
  ): Promise<any> {
    const offset = Math.ceil((page - 1) * limit);
    return await this._courseRepository.getAllCourses(
      role,
      keySort,
      offset,
      limit,
      search,
      sort
    );
  }
  async getDetailCourse(id: number): Promise<any> {
    const result =  await this._courseRepository.getDetailCourse(id);
    if (result === null) {
      throw {
        status: StatusCode.NOT_FOUND,
        msg: msg.NOT_FOUND("ID COURSE"),
      }
    }else {
      return result;
    }
  }
}
