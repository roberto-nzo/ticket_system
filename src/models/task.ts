import { Sequelize, Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, HasOneSetAssociationMixin } from 'sequelize'
import Role from './role'

const sequelize = new Sequelize('mysql://root:@localhost:3306/ticket_system')

class Task extends Model<InferAttributes<Task>, InferCreationAttributes<Task>>{
    declare id: CreationOptional<number>
    declare title: string
    declare description: String
    declare dueDate: CreationOptional<Date>

    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>

    declare setPriority: HasOneSetAssociationMixin<Role, 'id'>
}

Task.init(
    {
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
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    },
    {
        tableName: 'tasks',
        sequelize
    }
)

async function main() {
    await sequelize.sync()
}

main()

export default Task