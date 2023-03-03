import { Request, Response } from "express";
import Priority from "../../models/priority";

class PriorityService {
    // Create a priority
    createPriority = async (req: Request, res: Response) => {
        if (!req.body.priorityName) {
            res.status(400)
            throw new Error('Please complete all fields')
        } else {
            const priority = await Priority.create({
                priorityName: req.body.priorityName,
            })

            return priority
        }
    }

    // Get all priorities
    fetchRoles = async () => {
        const priority = await Priority.findAll()

        return priority
    }

    // Get one priority
    getRole = async (req: Request, res: Response) => {
        const priority = await Priority.findByPk(req.params.id)
        if (!priority) {
            res.status(400)
            throw new Error('Priority do not exist')
        }

        return priority
    }

    // Update a priority
    updatePriority = async (req: Request, res: Response) => {
        const priority = await Priority.findByPk(req.params.id)
        if (priority) {
            await priority.update({
                priorityName: req.body.priorityName ? req.body.priorityName : priority.priorityName,
            })
        } else {
            res.status(400)
            throw new Error('Priority do not exist')
        }

        return priority
    }

    // Delete a priority
    deletePriority = async (req: Request, res: Response) => {
        const priorityId = await Priority.findByPk(req.params.id)

        if (!priorityId) {
            res.status(400)
            throw new Error(`Priority don't exist`)
        }
        const priority = await Priority.destroy({
            where: {
                id: req.params.id
            }
        })

        return priority
    }
}

export default PriorityService