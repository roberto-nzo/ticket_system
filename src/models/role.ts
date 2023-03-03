'use strict';
import { Optional, Model, DataTypes } from 'sequelize';
import { roleSchema } from '../database/schema';
import { sequelize } from '.'

interface RoleAttributes {
  id: DataTypes.IntegerDataType,
  roleName: string
}

interface RolesCreationAttributes extends Optional<RoleAttributes, 'id'> { }

interface RoleInstance extends Model<RoleAttributes, RolesCreationAttributes>, RoleAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

const Roles = sequelize.define<RoleInstance>(
  'Roles', roleSchema
)

export default Roles