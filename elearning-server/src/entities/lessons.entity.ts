import { DataTypes } from "sequelize";
import sequelize from "../configs/db.config";
import { Course } from "./courses.entity";

export const Lesson = sequelize.define('lessons',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    courseId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    position: {
        type: DataTypes.SMALLINT,
        allowNull: false
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    videoURL: {
        type: DataTypes.TEXT,
        allowNull: false
    },
},{timestamps:true})

Lesson.belongsTo(Course,{foreignKey: "courseId",onDelete:"CASCADE",onUpdate:"CASCADE"})
Course.hasMany(Lesson,{foreignKey: "courseId"})