import ApiService from "../api/api.service";
import { IntfCourse } from "../types/interface";

class CourseRepository {
  private apiService: ApiService;
  constructor() {
    this.apiService = new ApiService();
  }
  async getAllCourses(form: any): Promise<any> {
    const result: any = await this.apiService.Get("courses/get-all", form);
    return result;
  }
  async postCourse(data: IntfCourse) {
    return await this.apiService.Post("/courses/create", data);
  }
  async updateCourse(id: number, data: any) {
    return await this.apiService.Patch("/courses/update", id, data);
  }
  async deleteCourse(id: number) {
    return await this.apiService.Delete("/courses/delete", id);
  }
}

export default CourseRepository;
