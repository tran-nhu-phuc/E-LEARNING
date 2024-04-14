import { MessageCodeResponse } from "../common/messageResponse.common";
import { StatusCode } from "../common/variableResponse.common";
import { LessonRepository } from "../repositories/lessons.repository";
import { ILesson } from "../types";
const msg = new MessageCodeResponse();
export class LessonService {
  private _lessonRepository: LessonRepository;
  constructor() {
    this._lessonRepository = new LessonRepository();
  }

  async createLesson(formLesson: ILesson): Promise<void> {
    await this._lessonRepository.createLesson(formLesson);
  }

  async deleteLesson(id: number): Promise<void> {
    const result = await this._lessonRepository.deleteLesson(id);
    if (result === 0) {
      throw {
        status: StatusCode.NOT_FOUND,
        msg: msg.NOT_FOUND("ID LESSON"),
      };
    }
  }

  async updateLesson(id: number, formLesson: any): Promise<void> {
    const result = await this._lessonRepository.updateLesson(id, formLesson);
    if (result[0] === 0) {
      throw {
        status: StatusCode.NOT_FOUND,
        msg: msg.NOT_FOUND("ID LESSON"),
      };
    }
  }
}
