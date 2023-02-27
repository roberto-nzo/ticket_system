import models from "../../models/index"
import { Request, Response } from "express";

class PriorityService {
    // Create a priority
    createPriority = async (req: Request, res: Response) => {
        if (!req.body.priorityName) {
            res.status(400)
            throw new Error('Please complete all fields')
        } else {
            const priority = await models.Priority.create({
                priorityName: req.body.priorityName,
            })

            return priority
        }
    }

    // Get all priorities
    fetchRoles = async () => {
        const priority = await models.Priority.findAll()

        return priority
    }

    // Get one priority
    getRole = async (req: Request, res: Response) => {
        const priority = await models.Priority.findByPk(req.params.id)
        if (!priority) {
            res.status(400)
            throw new Error('Priority do not exist')
        }

        return priority
    }

    // Update a priority
    updatePriority = async (req: Request, res: Response) => {
        const priority = await models.Priority.findByPk(req.params.id)
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
        const priorityId = await models.Priority.findByPk(req.params.id)

        if (!priorityId) {
            res.status(400)
            throw new Error(`Priority don't exist`)
        }
        const priority = await models.Priority.destroy({
            where: {
                id: req.params.id
            }
        })

        return priority
    }
}

export default PriorityService