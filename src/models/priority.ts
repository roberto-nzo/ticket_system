import { Sequelize, Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes } from 'sequelize'

const sequelize = new Sequelize('mysql://root:@localhost:3306/ticket_system')

class Priority extends Model<InferAttributes<Priority>, InferCreationAttributes<Priority>>{
    declare id: CreationOptional<number>
    declare priorityName: String

    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
}

Priority.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        priorityName: {
            type: new DataTypes.STRING(128),
            allowNull: false,
            unique: true
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    },
    {
        tableName: 'priorities',
        sequelize
    }
)

async function main() {
    await sequelize.sync()
}

main()

export default Priority