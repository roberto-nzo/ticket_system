import { DataTypes } from "sequelize";

export const taskSchema = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: new DataTypes.STRING(128),
        allowNull: false,
        unique: true
    },
    description: {
        type: new DataTypes.STRING(128),
        allowNull: false,
    },
    dueDate: {
        type: DataTypes.DATE
    },
    priorityId: {
        type: DataTypes.INTEGER
    }
}