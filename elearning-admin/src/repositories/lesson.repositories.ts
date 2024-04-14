import ApiService from "../api/api.service";
import { IntfLesson } from "../types/interface";

class LessonRepository {
  private apiService: ApiService;
  constructor() {
    this.apiService = new ApiService();
  }
  async getAllLessons(form: any): Promise<any> {
    const result: any = await this.apiService.Get("lessons/get-all", form);
    return result;
  }
  async postLesson(data: IntfLesson) {
    return await this.apiService.Post("/lessons/create", data);
  }
  async updateLesson(id: number, data: any) {
    return await this.apiService.Patch("/lessons/update", id, data);
  }
  async deleteLesson(id: number) {
    return await this.apiService.Delete("/lessons/delete", id);
  }
}

export default LessonRepository;
