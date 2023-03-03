import { DataTypes } from "sequelize";

export const userSchema = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    firstname: {
        type: new DataTypes.STRING(128),
        allowNull: true,
    },
    lastname: {
        type: new DataTypes.STRING(128),
        allowNull: true
    },
    username: {
        type: new DataTypes.STRING(128),
        allowNull: false,
        unique: true
    },
    email: {
        type: new DataTypes.STRING(128),
        allowNull: false,
        unique: true
    },
    password: {
        type: new DataTypes.STRING(128),
        allowNull: false,
    },
    roleId: {
        type: DataTypes.INTEGER
    }
}