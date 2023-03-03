import { DataTypes } from "sequelize";

export const roleSchema = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    roleName: {
        type: new DataTypes.STRING(128),
        allowNull: false,
        unique: true
    }
}