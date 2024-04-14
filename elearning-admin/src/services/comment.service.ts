import CommentRepository from "../repositories/comment.repositories";

class CommentService {
  private commentRepository: CommentRepository;
  constructor() {
    this.commentRepository = new CommentRepository();
  }
  public async getAllComments() {
    try {
      const form = { role: "admin" };
      const result = await this.commentRepository.getAllComments(form);
      if (result.status === 200) {
        const commentData = result.data;
        return commentData.data;
      } else {
        return 2;
      }
    } catch (error) {
    }
  }
}
export default CommentService;
