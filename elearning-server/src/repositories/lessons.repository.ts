import { Lesson } from "../entities/lessons.entity";

export class LessonRepository {
    async createLesson(formLesson: any): Promise<void> {
        await Lesson.create(formLesson);
    }

    async deleteLesson(id: number): Promise<number> {
       return await Lesson.destroy({ where: { id } });
    }

    async updateLesson(id: number, formLesson: any): Promise<number[]> {
       return await Lesson.update(formLesson, { where: { id } });
    }
}