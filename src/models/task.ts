'use strict';
import { Optional, Model, HasOneSetAssociationMixin } from 'sequelize';
import { taskSchema } from '../database/schema';
import { sequelize } from '.'
import Users from './user';

interface TasksAttributes {
  id: number,
  title: string
  description: string
  dueDate: Date
}

interface TasksCreationAttributes extends Optional<TasksAttributes, 'id'> { }

interface TaskInstance extends Model<TasksAttributes, TasksCreationAttributes>, TasksAttributes {

  setPriorities(findPriority: any): unknown;
  priorityId: number;
  createdAt: Date;
  updatedAt: Date;
}

const Tasks = sequelize.define<TaskInstance>(
  'Tasks', taskSchema
)

Users.belongsToMany(Tasks, { through: "UserTasks" })
Tasks.belongsToMany(Users, { through: "UserTasks" })

export default Tasks