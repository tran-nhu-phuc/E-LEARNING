import { DataTypes } from "sequelize";
import sequelize from "../configs/db.config";
import { User } from "./users.entity";
import { Course } from "./courses.entity";

export const RegisteredCourse = sequelize.define('registeredCourses',{
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
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    codePayment: {
        type: DataTypes.STRING,
        allowNull: false
    },
    totalLessons: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    completedLessons: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
},{timestamps: true})

RegisteredCourse.belongsTo(User,{foreignKey: "userId", onDelete: "CASCADE", onUpdate:"CASCADE"})
User.hasMany(RegisteredCourse,{foreignKey:"userId"})

RegisteredCourse.belongsTo(Course,{foreignKey: "courseId", onDelete: "CASCADE", onUpdate:"CASCADE"})
Course.hasMany(RegisteredCourse,{foreignKey: "courseId"})