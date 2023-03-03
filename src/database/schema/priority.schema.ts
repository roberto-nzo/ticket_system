import { DataTypes } from "sequelize";

export const prioritySchema = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    priorityName: {
        type: new DataTypes.STRING(128),
        allowNull: false,
        unique: true
    }
}
