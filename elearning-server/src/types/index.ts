export interface IRegister {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
export interface ICourse {
  categoryId: number;
  level: number;
  courseName: string;
  description: string;
  completedContent: string;
  image: string;
  price: number;
}

export interface ILesson {
  courseId: number;
  title: string;
  position: number;
  duration: number;
  videoURL: string;
}

export interface IRegisterCourse {
  userId:number;
  courseId: number;
  price: number;
}
export interface IRate {
  courseId: number;
  userId: number;
  rateStar: number;
  content: string;
}
export interface IComment {
  courseId: number;
  userId: number;
  content: string;
}
export interface IAdmin {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}
export interface IError {
  status: number;
  msg: string;
}
