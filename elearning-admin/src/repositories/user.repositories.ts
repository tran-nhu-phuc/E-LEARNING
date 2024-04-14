import ApiService from "../api/api.service";

class UserRepository {
  private apiService: ApiService;
  constructor() {
    this.apiService = new ApiService();
  }
  async login(formRequest: any): Promise<any> {
    const result = await this.apiService.Post("/admins/login", formRequest);
    return result;
  }
  async getAllUsers(form: any): Promise<any> {
    const result: any = await this.apiService.Get("users/get-all", form);
    return result;
  }
  async activeUser(id: number) {
    return await this.apiService.Patch("/users/unblock", id, { status: 1 });
  }
  async blockUser(id: number) {
    return await this.apiService.Patch("/users/block", id, { status: 2 });
  }
  async searchUsers(searchValue: string) {
    return await this.apiService.Search("/users/search", searchValue);
  }
  async createAdmin(formAdmin: any) {
    return await this.apiService.Post("/admin/create", formAdmin);
  }
  async getAllAdmins() {
    return await this.apiService.Get("/admin");
  }
  async getUserById(id: number): Promise<any> {
    const result = await this.apiService.GetById("users", id);
    return result;
  }
  async deleteAdmin(id: number): Promise<any> {
    const result = await this.apiService.Delete("/admin", id);
    return result;
  }
}

export default UserRepository;
