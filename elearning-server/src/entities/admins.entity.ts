import { DataTypes } from "sequelize";
import sequelize from "../configs/db.config";

export const Admin = sequelize.define('admins',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 1
    },
    avatar: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue:"https://static.vecteezy.com/system/resources/previews/026/619/142/non_2x/default-avatar-profile-icon-of-social-media-user-photo-image-vector.jpg"
    },
},{timestamps:true})