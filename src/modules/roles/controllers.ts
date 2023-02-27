import expressAsyncHandler from "express-async-handler";
import RoleService from "./services";
import { Request, Response } from "express"

const roleService = new RoleService()

// Create a role
const createRole = expressAsyncHandler(async (req: Request, res: Response) => {
    const newRole = await roleService.createRole(req, res)
    res.status(200).json(newRole)
})

// fetch all roles
const allRoles = expressAsyncHandler(async (req: Request, res: Response) => {
    const roles = await roleService.fetchRoles()
    res.status(200).json(roles)
})

// Get one role
const getRole = expressAsyncHandler(async (req: Request, res: Response) => {
    const role = await roleService.getRole(req, res)
    res.status(200).json(role)
})

// Update a role
const updateRole = expressAsyncHandler(async (req: Request, res: Response) => {
    const updatedRole = await roleService.updateRole(req, res)
    res.status(200).json(updatedRole)
})

// Delete a role
const deleteRole = expressAsyncHandler(async (req: Request, res: Response) => {
    const dltRole = await roleService.deleteRole(req, res)
    res.status(200).json(dltRole)
})

export default { createRole, allRoles, deleteRole, updateRole, getRole }
