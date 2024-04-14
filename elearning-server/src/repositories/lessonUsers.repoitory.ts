import { LessonUser } from "../entities/lessonsUser.entity";

export class LessonUserRepository {
    async createLessonUser(formLessonUser: any): Promise<void> {
        await LessonUser.create(formLessonUser);
    }

    async finishLesson(form:any){
        await LessonUser.update({isFinished: 1}, {where: form});
    }

    async checkLessonUser(form:any) {
        const data = await LessonUser.findAll({where:{
            lessonId: form.lessonId,
            registeredCourseId: form.registeredCourseId
        }})
        return data;
    }
}