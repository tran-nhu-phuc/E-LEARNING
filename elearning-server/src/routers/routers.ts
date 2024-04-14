import {Express} from 'express';
import { authController } from '../controllers/auth.controller';
import { userController } from '../controllers/users.controller';
import { courseController } from '../controllers/courses.controller';
import { lessonController } from '../controllers/lessons.controller';
import { registerCourseController } from '../controllers/registeredCourses.controller';
import { rateController } from '../controllers/rates.controller';
import { commentCourseController } from '../controllers/commentCourses.controller';
import { adminController } from '../controllers/admins.controller';
import { lessonUserController } from '../controllers/lessonUsers.controller';
export const routers = (app:Express) => {
    app.use('/auth',authController);
    app.use('/users',userController);
    app.use('/courses',courseController);
    app.use('/lessons',lessonController);
    app.use('/register-courses',registerCourseController);
    app.use('/rates',rateController);
    app.use('/comments',commentCourseController);
    app.use('/admins',adminController);
    app.use('/lesson-users',lessonUserController);
}
