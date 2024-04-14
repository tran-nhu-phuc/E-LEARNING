import Api from "../apis/api";

export class LessonUserRepository {
    private _api: Api;
    constructor() {
        this._api = new Api();
    }

    async cerateLessonUser(lessonId:number, registeredCourseId:number){
       await this._api.Post("/lesson-users/create",{lessonId,registeredCourseId})
    }

    async updateStateLessonUser(form: any){
        await this._api.Patch("/lesson-users/finished-lesson",form)
    }
}