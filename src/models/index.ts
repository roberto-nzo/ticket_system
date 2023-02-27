import User from "./user"
import Task from "./task"
import Priority from "./priority"
import Role from "./role"
import { Sequelize } from 'sequelize'

const db = new Sequelize('mysql://root:@localhost:3306/ticket_system')

// Many-Many User-Task
User.belongsToMany(Task, { through: 'UserTask' })
Task.belongsToMany(User, { through: 'UserTask' })

// One-Many Role-User
User.belongsTo(Role)
Role.hasMany(User)

// One-Many Tasks-Priority
Task.belongsTo(Priority)
Priority.hasMany(Task)


export default { User, Task, Role, Priority }