'use strict';
import { Optional, Model, CreationOptional } from 'sequelize';
import { userSchema } from '../database/schema';
import { sequelize } from '.'
import Roles from './role';
import bcrypt from 'bcrypt'
import sendMail from '../middleware/sendMail';


interface UserAttributes {
  id: number,
  firstname: string,
  lastname: string,
  username: string,
  email: string,
  password: string,
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> { }

interface UserInstance extends Model<UserAttributes, UserCreationAttributes>, UserAttributes {
  addTask //   }, {
    (fetchTask: any): unknown;
  setRole(fetchRole: any): unknown;
  roleId: number;
  createdAt: Date;
  updatedAt: Date;
}

const Users = sequelize.define<UserInstance>(
  'Users',
  userSchema,
  {
    hooks: {
      beforeCreate: async (user, options) => {
        await hashPassword(user)
      },
      afterCreate: (user, options) => {
        try {
          sendMail(user)
        } catch (error) {
          throw new Error
        }
      }
    }
  }
)

// Hash password
async function hashPassword(user: { password: string | Buffer; }) {
  if (user.password) {
    const salt = bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, await salt)
  }
}

Users.belongsTo(Roles)
Roles.hasMany(Users)

export default Users
