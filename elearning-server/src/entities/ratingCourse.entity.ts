import { DataTypes } from "sequelize";
import sequelize from "../configs/db.config";
import { Course } from "./courses.entity";
import { User } from "./users.entity";

export const RatingCourse = sequelize.define('ratingCourses',{
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
    rateStar: {
        type: DataTypes.TINYINT,
        allowNull: false
    },
    isActive: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0
    }
},{timestamps:true})

RatingCourse.belongsTo(Course,{foreignKey: "courseId",onDelete:"CASCADE",onUpdate:"CASCADE"})
Course.hasMany(RatingCourse,{foreignKey: "courseId"})

RatingCourse.belongsTo(User,{foreignKey: "userId",onDelete:"CASCADE",onUpdate:"CASCADE"})
User.hasOne(RatingCourse,{foreignKey:"userId"})