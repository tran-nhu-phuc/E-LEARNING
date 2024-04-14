import Api from "../apis/api";
import { IntfCourse } from "../types/entities.type";

export class CourseRepository {
  apiService: Api;
  constructor() {
    this.apiService = new Api();
  }
  async getAllCourses(form: any): Promise<any> {
    const result: any = await this.apiService.Get("/courses/get-all",form);
    return result.data;
  }

  async getCoursesById(id: number): Promise<any> {
    const result: any = await this.apiService.GetById("/courses/detail", id);
    return result;
  }

  async patchNew(id: number, data: IntfCourse | any) {
    await this.apiService.Patch("courses", id, data);
  }
  async postCourse(data: IntfCourse) {
    await this.apiService.Post("courses", data);
  }
  async getDetailCourse(courseId: number) {
    return await this.apiService.GetById("/courses/detail", courseId);
  }
}
