import ApiService from "../api/api.service";

class CommentRepository {
  private apiService: ApiService;
  constructor() {
    this.apiService = new ApiService();
  }
  async getAllComments(form: any): Promise<any> {
    const result: any = await this.apiService.Get("comments/get-all", form);
    return result;
  }
  
}

export default CommentRepository;
