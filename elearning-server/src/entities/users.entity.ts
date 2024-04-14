import { DataTypes } from "sequelize";
import sequelize from "../configs/db.config";

export const User = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
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
    avatar: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue:"https://static.vecteezy.com/system/resources/previews/026/619/142/non_2x/default-avatar-profile-icon-of-social-media-user-photo-image-vector.jpg"
    },
    isBlocked: {
        type: DataTypes.TINYINT,
        allowNull: true,
        defaultValue: 0
    },
    isCommentBlocked: {
        type: DataTypes.TINYINT,
        allowNull: true,
        defaultValue: 0
    }
},{timestamps: true})