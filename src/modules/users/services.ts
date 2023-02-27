import models from "../../models/index"
import { Request, Response } from "express";
const jwt = require('jsonwebtoken')
import bcrypt from 'bcrypt'

class UserService {
    // Register a user
    registerUser = async (req: Request, res: Response) => {
        if (!req.body.firstname || !req.body.lastname || !req.body.username || !req.body.email || !req.body.password || !req.body.role) {
            res.status(400)
            throw new Error('Please complete all fields')
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        const fetchRole: any = await models.Role.findOne({ where: { roleName: req.body.role } })

        if (fetchRole) {
            const user = await models.User.create({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword
            })
            await user.setRole(fetchRole)
            if (req.body.task) {
                const fetchTask: any = await models.Task.findOne({ where: { title: req.body.task } })
                await user.addTask(fetchTask)
            }
            return user
        } else {
            res.status(401)
            throw new Error('Invalid user data')
        }

    }

    // Login user
    loginUser = async (req: Request, res: Response) => {
        const { username, password } = req.body
        const user: any = await models.User.findOne({
            where: { username },
            include: [
                {
                    model: models.Role,
                    attributes: { exclude: ['createdAt', 'updatedAt'] }
                },
                {
                    model: models.Task,
                    attributes: { exclude: ['createdAt', 'updatedAt'] }
                }
            ],
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        })
        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                id: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
                username: user.username,
                email: user.email,
                RoleId: user.RoleId,
                Role: user.Role,
                Tasks: user.Tasks,
                token: this.generateToken(user.id, user.RoleId)
            })
        } else {
            res.status(400)
            throw new Error('Invalid credentials')
        }
    }

    // Get all users
    fetchUsers = async () => {
        const users = await models.User.findAll(
            {
                attributes: {
                    exclude: ['password', 'createdAt', 'updatedAt']
                },
                include: [{
                    model: models.Task,
                    attributes: { exclude: ['createdAt', 'updatedAt'] }
                },
                {
                    model: models.Role,
                    attributes: { exclude: ['createdAt', 'updatedAt'] }
                }]
            }
        )

        return users
    }

    // Get one user
    getUser = async (req: Request, res: Response) => {
        const user = await models.User.findByPk(req.params.id)
        if (!user) {
            res.status(400)
            throw new Error('User do not exist')
        }

        return user
    }

    // Update a user
    updateUser = async (req: Request, res: Response) => {
        const user = await models.User.findByPk(req.params.id)
        if (user) {
            if (req.body.role) {
                const role: any = await models.Role.findOne({ where: { roleName: req.body.role } })
                await user.setRole(role?.id)
            }
            if (req.body.task) {
                const task: any = await models.Task.findOne({ where: { title: req.body.task } })
                await user.addTask(task?.id)
            }
            await user.update({
                firstname: req.body.firstname ? req.body.firstname : user.firstname,
                lastname: req.body.lastname ? req.body.lastname : user.lastname,
                username: req.body.username ? req.body.username : user.username,
                email: req.body.email ? req.body.email : user.email
            })
        } else {
            res.status(400)
            throw new Error('Wrong information')
        }

        return user
    }

    // Delete a user
    deleteUser = async (req: Request, res: Response) => {
        const userId = await models.User.findByPk(req.params.id)

        if (!userId) {
            res.status(400)
            throw new Error(`User don't exist`)
        }
        const user = await models.User.destroy({
            where: {
                id: req.params.id
            }
        })

        return user
    }

    generateToken = (id: number, roleId: number) => {
        return jwt.sign({ id, roleId }, process.env.JWT_SECRET)
    }
}

export default UserService