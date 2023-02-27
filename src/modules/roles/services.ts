import models from "../../models/index"
import { Request, Response } from "express";

class RoleService {
    // Create a role
    createRole = async (req: Request, res: Response) => {
        if (!req.body.roleName) {
            res.status(400)
            throw new Error('Please complete all fields')
        } else {
            const role = await models.Role.create({
                roleName: req.body.roleName,
            })

            return role
        }
    }

    // Get all roles
    fetchRoles = async () => {
        const roles = await models.Role.findAll()

        return roles
    }

    // Get one role
    getRole = async (req: Request, res: Response) => {
        const role = await models.Role.findByPk(req.params.id)
        if (!role) {
            res.status(400)
            throw new Error('Role do not exist')
        }

        return role
    }

    // Update a role
    updateRole = async (req: Request, res: Response) => {
        const role = await models.Role.findByPk(req.params.id)
        if (!role) {
            res.status(400)
            throw new Error('Role do not exist')
        } else {
            await role.update({
                roleName: req.body.roleName ? req.body.roleName : role.roleName,
            })
        }

        return role
    }

    // Delete a role
    deleteRole = async (req: Request, res: Response) => {
        const roleId = await models.Role.findByPk(req.params.id)

        if (!roleId) {
            res.status(400)
            throw new Error(`Role don't exist`)
        }
        const role = await models.Role.destroy({
            where: {
                id: req.params.id
            }
        })

        return role
    }
}

export default RoleService