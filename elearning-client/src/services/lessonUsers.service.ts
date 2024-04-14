import { LessonUserRepository } from "../repositories/lessonUsers.repository";

export class LessonUserService {
    private _lessonUserRepository: LessonUserRepository;
    constructor() {
        this._lessonUserRepository = new LessonUserRepository();
    }

    async createLessonUser(lessonId:number,registeredCourseId:number) {
        try {
            await this._lessonUserRepository.cerateLessonUser(lessonId,registeredCourseId)
        } catch (error) {
        }
    }

    async updateStateLessonUser(lessonId:number,registeredCourseId:number){
        try {
            const form = {
                lessonId,
                registeredCourseId
            }
            await this._lessonUserRepository.updateStateLessonUser(form)
        } catch (error) {
        }
    }
}