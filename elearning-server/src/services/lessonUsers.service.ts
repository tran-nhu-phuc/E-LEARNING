import { StatusCode } from "../common/variableResponse.common";
import { LessonUserRepository } from "../repositories/lessonUsers.repoitory";

export class LessonUserService {
  private _lessonUserRepository: LessonUserRepository;
  constructor() {
    this._lessonUserRepository = new LessonUserRepository();
  }

  async createLessonUser(formLessonUser: any): Promise<void> {
    const check = await this._lessonUserRepository.checkLessonUser(formLessonUser);
    if (check.length === 0) {
      await this._lessonUserRepository.createLessonUser(formLessonUser);
    }
  }

  async finishedLesson(form: any) {
    await this._lessonUserRepository.finishLesson(form);
  }
}
