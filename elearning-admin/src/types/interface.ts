export interface IntfUser {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar?: string;
  isBlocked?: number;
  isCommentBlocked?: number;
  createdAt?: string;
  updatedAt?: string;
}
export interface IntfLogin {
  email: string;
  password: string;
}
export interface IntfAdminLogin {
  userName: string;
  password: string;
}
export interface IntfRegister {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
export interface IntfCourse {
  categoryId: number;
  level: number;
  courseName: string;
  description: string;
  completedContent: string;
  image: string;
  price: number;
}

export interface IntfLesson {
  courseId: number;
  title: string;
  position: number;
  duration: number;
  videoURL: string;
}

export interface IntfRegisterCourse {
  userId: number;
  courseId: number;
  price: number;
}
export interface IntfRate {
  courseId: number;
  userId: number;
  rateStar: number;
  content: string;
}
export interface IntfComment {
  courseId: number;
  userId: number;
  content: string;
}
export interface IntfAdmin {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}
export interface IntfError {
  status: number;
  msg: string;
}
