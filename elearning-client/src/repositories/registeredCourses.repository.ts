import Api from "../apis/api";

export class RegisteredCourseRepository {
  private _api: Api;
  constructor() {
    this._api = new Api();
  }

  async getDetailRegisteredCourseUser(form: any) {
    return await this._api.Get("/register-courses/get-detail-registered", form);
  }

  async updateStateCourseUser(form: any) {
    await this._api.Patch("/register-courses/finished-lessons", form);
  }

  async create(form: any) {
    await this._api.Post("/register-courses/create", form);
  }

  async getHistory(userId: number) {
    return await this._api.GetById("/register-courses/get", userId);
  }
}
