import { Request, Response } from "express";
import Priorities from "../../models/priority";
import Tasks from "../../models/task";
import Users from "../../models/user";

class TaskService {
    // Create a task
    createTask = async (req: Request, res: Response) => {
        if (!req.body.title || !req.body.description || !req.body.dueDate || !req.body.priority) {
            res.status(400)
            throw new Error('Please complete all fields')
        } else {
            const fetchTask = await Tasks.findOne({ where: { title: req.body.title } })

            if (fetchTask) {
                res.status(400)
                throw new Error(`${fetchTask.title} already exist`)
            }

            const findPriority = await Priorities.findOne({ where: { priorityName: req.body.priority } })

            const task = await Tasks.create({
                title: req.body.title,
                description: req.body.description,
                dueDate: req.body.dueDate,
            })

            await task.setPriorities(findPriority)

            return task
        }
    }

    // Get all tasks
    fetchTasks = async (req: any) => {
        const tasks = await Tasks.findAll({
            include: [
                {
                    model: Users,
                    attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
                },
                {
                    model: Priorities,
                    as: 'priorities'
                }
            ]
        })

        return tasks
    }

    // Get one task
    getTask = async (req: Request, res: Response) => {
        const task = await Tasks.findByPk(req.params.id)
        if (!task) {
            res.status(400)
            throw new Error('Task do not exist')
        }

        return task
    }

    // Update a task
    updateTask = async (req: Request, res: Response) => {
        const task = await Tasks.findByPk(req.params.id)
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
        const task: any = await Tasks.findByPk(req.params.id, {
            include: [{
                model: Users,
                attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
            }]
        })

        if (task) {

            const taskId = await Tasks.destroy({
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