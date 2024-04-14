import LessonRepository from "../repositories/lesson.repositories";
import { IntfLesson } from "../types/interface";

class LessonService {
  private lessonRepository: LessonRepository;
  constructor() {
    this.lessonRepository = new LessonRepository();
  }
  public async getAllLessons() {
    try {
      const form = { role: "user" };
      const result = await this.lessonRepository.getAllLessons(form);
      if (result.status === 200) {
        const lessonData = result.data;
        return lessonData.data;
      } else {
        return 2;
      }
    } catch (error) {
    }
  }
  public async addLesson(data: any) {
    try {
      const result = await this.lessonRepository.postLesson(data);
      if (result.status === 201) {
        return 1;
      } else {
        return 2;
      }
    } catch (error) {
    }
  }

  public async updateLesson(id: number, data: any) {
    try {
      const result = await this.lessonRepository.updateLesson(id, data);
      if (result.status === 200) {
        return 1;
      } else {
        return 2;
      }
    } catch (error) {
    }
  }
  public async deleteLesson(id: number) {
    await this.lessonRepository.deleteLesson(id);
  }
  public async editLesson(id: number, data: IntfLesson) {
    await this.lessonRepository.updateLesson(id, data);
  }
}
export default LessonService;
