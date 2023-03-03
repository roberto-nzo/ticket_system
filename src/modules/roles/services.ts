import { Request, Response } from "express";
import Role from "../../models/role";

class RoleService {
    // Create a role
    createRole = async (req: Request, res: Response) => {
        if (!req.body.roleName) {
            res.status(400)
            throw new Error('Please complete all fields')
        } else {
            const role = await Role.create({
                roleName: req.body.roleName,
            })

            return role
        }
    }

    // Get all roles
    fetchRoles = async () => {
        const roles = await Role.findAll()

        return roles
    }

    // Get one role
    getRole = async (req: Request, res: Response) => {
        const role = await Role.findByPk(req.params.id)
        if (!role) {
            res.status(400)
            throw new Error('Role do not exist')
        }

        return role
    }

    // Update a role
    updateRole = async (req: Request, res: Response) => {
        const role = await Role.findByPk(req.params.id)
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
        const roleId = await Role.findByPk(req.params.id)

        if (!roleId) {
            res.status(400)
            throw new Error(`Role don't exist`)
        }
        const role = await Role.destroy({
            where: {
                id: req.params.id
            }
        })

        return role
    }
}

export default RoleService