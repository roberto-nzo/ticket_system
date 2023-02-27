import { Sequelize, Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, HasOneSetAssociationMixin, HasManyAddAssociationMixin } from 'sequelize'
import Role from './role'
import Task from './task'

const sequelize = new Sequelize('mysql://root:@localhost:3306/ticket_system')

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>>{
    declare id: CreationOptional<number>
    declare firstname: string
    declare lastname: string
    declare username: string
    declare email: string
    declare password: CreationOptional<string>

    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>

    declare setRole: HasOneSetAssociationMixin<Role, 'id'>
    declare addTask: HasManyAddAssociationMixin<Task, 'id'>
}

User.init(
    {
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
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    },
    {
        tableName: 'users',
        sequelize
    }
)

async function main() {
    await sequelize.sync()
}

main()

export default User