import { MessageCodeResponse } from "../common/messageResponse.common";
import { StatusCode } from "../common/variableResponse.common";
import { CommentCourseRepository } from "../repositories/commentCourses.repository";
import { IComment } from "../types";
const msg = new MessageCodeResponse();
export class CommentCourseService {
  private _commentCourseRepository: CommentCourseRepository;
  constructor() {
    this._commentCourseRepository = new CommentCourseRepository();
  }

  async create(form: IComment): Promise<void> {
    await this._commentCourseRepository.create(form);
  }

  async delete(commentId: number): Promise<void> {
    const result = await this._commentCourseRepository.delete(commentId);
    if (result === 0) {
      throw {
        status: StatusCode.NOT_FOUND,
        msg: msg.NOT_FOUND("ID COMMENT"),
      };
    }
  }

  async getAll(
    search: string,
    page: number,
    limit: number,
    courseId: number | undefined
  ): Promise<any> {
    const offset = Math.ceil((page - 1) * limit);
    return await this._commentCourseRepository.getAll(
      search,
      offset,
      limit,
      courseId
    );
  }

  async getCountComment(courseId: number) {
    return await this._commentCourseRepository.getCountComment(courseId);
  }
}
