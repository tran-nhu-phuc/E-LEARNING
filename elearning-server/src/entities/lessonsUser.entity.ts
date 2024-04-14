import { DataTypes } from "sequelize";
import sequelize from "../configs/db.config";
import { RegisteredCourse } from "./registeredCourse.entity";

export const LessonUser = sequelize.define("LessonUsers", {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    registeredCourseId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    lessonId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    isFinished: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0
    }
})

LessonUser.belongsTo(RegisteredCourse,{foreignKey: "registeredCourseId", onDelete: "CASCADE", onUpdate: "CASCADE"})
RegisteredCourse.hasMany(LessonUser,{foreignKey: "registeredCourseId"})