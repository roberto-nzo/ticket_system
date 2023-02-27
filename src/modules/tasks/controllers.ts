import expressAsyncHandler from "express-async-handler";
import TaskService from "./services";
import { Request, Response } from "express"

const taskService = new TaskService()

// Create a task
const createTask = expressAsyncHandler(async (req: Request, res: Response) => {
    const newTask = await taskService.createTask(req, res)
    res.status(200).json(newTask)
})

// fetch all tasks
const allTasks = expressAsyncHandler(async (req: Request, res: Response) => {
    const tasks = await taskService.fetchTasks(req)
    res.status(200).json(tasks)
})

// Get one task
const getOne = expressAsyncHandler(async (req: Request, res: Response) => {
    const task = await taskService.getTask(req, res)
    res.status(200).json(task)
})

// Update a task
const updateTask = expressAsyncHandler(async (req: Request, res: Response) => {
    const updatedTask = await taskService.updateTask(req, res)
    res.status(200).json(updatedTask)
})

// Delete a task
const deleteTask = expressAsyncHandler(async (req: Request, res: Response) => {
    const dltTask = await taskService.deleteTask(req, res)
    res.status(200).json(dltTask)
})

export default { createTask, allTasks, deleteTask, updateTask, getOne }
