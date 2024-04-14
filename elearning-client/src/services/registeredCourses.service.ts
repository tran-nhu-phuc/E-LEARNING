import { RegisteredCourseRepository } from "../repositories/registeredCourses.repository";

export class RegisteredCourseService {
    private _registeredCourseRepository: RegisteredCourseRepository;
    constructor() {
        this._registeredCourseRepository = new RegisteredCourseRepository();
    }

    async getDetailRegisteredCourseUser(userId:number, courseId:number) {
        try {
            const form = {
                userId,
                courseId
            }
            const result = await this._registeredCourseRepository.getDetailRegisteredCourseUser(form)
            return result.data.data[0]
        } catch (error) {
        }
    }

    async updateStateCourseUser(userId:number, courseId:number,completedLessons:number) {
        try {
            const form = {
                userId,
                courseId,
                completedLessons,
            }
            await this._registeredCourseRepository.updateStateCourseUser(form)
        } catch (error) {
        }
    }

    async create(form: any){
        try {
            await this._registeredCourseRepository.create(form)
        } catch (error) {
        }
    }
    
    async getHistory(userId:number){
        try {
            const result = await this._registeredCourseRepository.getHistory(userId)
            return result.data.data
        } catch (error) {
        }
    }
}