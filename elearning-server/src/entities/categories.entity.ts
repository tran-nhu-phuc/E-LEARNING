import { DataTypes } from "sequelize";
import sequelize from "../configs/db.config";

export const Category = sequelize.define('categories',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{timestamps:false})