import expressAsyncHandler from "express-async-handler";
import PriorityService from "./services";
import { Request, Response } from "express"

const priorityService = new PriorityService()

// Create a priority
const createPriority = expressAsyncHandler(async (req: Request, res: Response) => {
    const newPriority = await priorityService.createPriority(req, res)
    res.status(200).json(newPriority)
})

// fetch all priorities
const allPriorities = expressAsyncHandler(async (req: Request, res: Response) => {
    const priority = await priorityService.fetchRoles()
    res.status(200).json(priority)
})

// Get one priority
const getPriority = expressAsyncHandler(async (req: Request, res: Response) => {
    const role = await priorityService.getRole(req, res)
    res.status(200).json(role)
})

// Update a priority
const updatePriority = expressAsyncHandler(async (req: Request, res: Response) => {
    const updatedPriority = await priorityService.updatePriority(req, res)
    res.status(200).json(updatedPriority)
})

// Delete a priority
const deletePriority = expressAsyncHandler(async (req: Request, res: Response) => {
    const dltPriority = await priorityService.deletePriority(req, res)
    res.status(200).json(dltPriority)
})

export default { createPriority, allPriorities, deletePriority, updatePriority, getPriority }
