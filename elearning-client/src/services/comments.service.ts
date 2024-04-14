import { CommentRepository } from "../repositories/comments.repository";

export class CommentService {
  private _commentRepository: CommentRepository;
  constructor() {
    this._commentRepository = new CommentRepository();
  }

  async getComments(limit: number, courseId: number) {
    try {
      const form = {
        page: 1,
        courseId,
        limit,
        key: "user",
      };
      const result = await this._commentRepository.getComments(form);
      return result.data.data
    } catch (error) {
    }
  }

  async getCountComment(courseId: number){
    try {
        const form = {
            key: "user",
            courseId
        }
        const result = await this._commentRepository.getCountComment(form)
        return result.data.count
    } catch (error) {
        
    }
  }

  async createComment(userId:number, courseId:number, content:string) {
    const form = {
      userId,
      courseId,
      content
    }
    await this._commentRepository.createComment(form)
  }
}
