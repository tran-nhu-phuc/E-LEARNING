import { CourseRepository } from "../repositories/course.repository";
import { IntfCourse } from "../types/entities.type";

class CoursesService {
  private coursesRepository: CourseRepository;

  constructor() {
    this.coursesRepository = new CourseRepository();
  }
  public async getAllCourses() {
    const form = {
      role: "user"
    }
    const data = await this.coursesRepository.getAllCourses(form);
    return data;
  }
  public async getDetailCourse(courseId: number) {
    try {
      const result = await this.coursesRepository.getDetailCourse(courseId);
      return result.data.data[0];
    } catch (error) {
    }
  }
  public async getCoursesById(id: number): Promise<IntfCourse> {
    let result = await this.coursesRepository.getCoursesById(id);
    return result.data.data[0];
  }
  public async onSearch(value: string) {
    const form = {
      role: "user",
      search: value
    }
    const result = await this.coursesRepository.getAllCourses(form);
    return result.data;
  }
  
}

export default CoursesService;
