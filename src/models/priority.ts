'use strict';
import { Optional, Model, DataTypes } from 'sequelize';
import { prioritySchema, roleSchema } from '../database/schema';
import { sequelize } from '.'
import Tasks from './task';

interface PriorityAttributes {
  id: number,
  priorityName: string
}

interface PriorityCreationAttributes extends Optional<PriorityAttributes, 'id'> { }

interface PriorityInstance extends Model<PriorityAttributes, PriorityCreationAttributes>, PriorityAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

const Priorities = sequelize.define<PriorityInstance>(
  'Priorities', prioritySchema
)

Priorities.hasMany(Tasks, {
  sourceKey: 'id',
  foreignKey: 'PriorityId',
  as: 'tasks'
})
Tasks.belongsTo(Priorities, {
  foreignKey: 'PriorityId',
  as: 'priorities'
})

export default Priorities