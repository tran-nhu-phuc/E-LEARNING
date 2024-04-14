import { DataTypes } from "sequelize";
import sequelize from "../configs/db.config";
import { Course } from "./courses.entity";
import { User } from "./users.entity";

export const CommentCourse = sequelize.define('commentCourses',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    courseId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
},{timestamps:true})

CommentCourse.belongsTo(Course,{foreignKey: "courseId", onDelete: "CASCADE", onUpdate:"CASCADE"})
Course.hasMany(CommentCourse,{foreignKey: "courseId"})

CommentCourse.belongsTo(User,{foreignKey: "userId", onDelete: "CASCADE", onUpdate:"CASCADE"})
User.hasMany(CommentCourse,{foreignKey:"userId"})
