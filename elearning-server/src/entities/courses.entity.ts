import { DataTypes } from "sequelize";
import sequelize from "../configs/db.config";
import { Category } from "./categories.entity";

export const Course = sequelize.define('courses',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    level: {
        type: DataTypes.TINYINT,
        allowNull: false
    },
    courseName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    completedContent: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    studentCount: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    state: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0
    },
},{timestamps:true})

Course.belongsTo(Category,{foreignKey: "categoryId", onDelete: "CASCADE", onUpdate: "CASCADE"})
Category.hasMany(Course,{foreignKey: "categoryId"})