import models from "../../models/index"
import { Request, Response } from "express";

class TaskService {
    // Create a task
    createTask = async (req: Request, res: Response) => {
        if (!req.body.title || !req.body.description || !req.body.dueDate) {
            res.status(400)
            throw new Error('Please complete all fields')
        } else {
            const task = await models.Task.create({
                title: req.body.title,
                description: req.body.description,
                dueDate: req.body.dueDate,
            })
            if (req.body.priority) {
                const fetchPriority: any = await models.Priority.findOne({ where: { priorityName: req.body.priority } })
                await task.setPriority(fetchPriority)
            }

            return task
        }
    }

    // Get all tasks
    fetchTasks = async (req: any) => {
        const tasks = await models.Task.findAll()

        const task: any = await models.Task.findByPk(1, {
            include: [
                {
                    model: models.User,
                    attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
                }
            ]
        })

        const test = task.Users.map((role: any) => role.RoleId)

        // console.log(test)

        console.log(req.user)


        return task
    }

    // Get one task
    getTask = async (req: Request, res: Response) => {
        const task = await models.Task.findByPk(req.params.id)
        if (!task) {
            res.status(400)
            throw new Error('Task do not exist')
        }

        return task
    }

    // Update a task
    updateTask = async (req: Request, res: Response) => {
        const task = await models.Task.findByPk(req.params.id)
        if (task) {
            await task.update({
                title: req.body.title ? req.body.title : task.title,
                description: req.body.description ? req.body.description : task.description,
                dueDate: req.body.dueDate ? req.body.dueDate : task.dueDate,
            })
        } else {
            res.status(400)
            throw new Error('Task do not exist')
        }

        return task
    }

    // Delete a task
    deleteTask = async (req: any, res: Response) => {
        const task: any = await models.Task.findByPk(req.params.id, {
            include: [{
                model: models.User,
                attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
            }]
        })

        if (task) {

            const taskId = await models.Task.destroy({
                where: {
                    id: req.params.id
                }
            })

            return ({
                message: "Deleted",
                task
            })
        } else {
            res.status(400)
            throw new Error(`Task don't exist`)
        }
    }
}

export default TaskService