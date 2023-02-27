import { Sequelize, Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes } from 'sequelize'

const sequelize = new Sequelize('mysql://root:@localhost:3306/ticket_system')

class Role extends Model<InferAttributes<Role>, InferCreationAttributes<Role>>{
    declare id: CreationOptional<number>
    declare roleName: String

    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
}

Role.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        roleName: {
            type: new DataTypes.STRING(128),
            allowNull: false,
            unique: true
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    },
    {
        tableName: 'roles',
        sequelize
    }
)

async function main() {
    await sequelize.sync()
}

main()

export default Role