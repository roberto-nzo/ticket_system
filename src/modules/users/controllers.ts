import expressAsyncHandler from "express-async-handler";
import UserService from "./services";
import { Request, Response } from "express"

const userService = new UserService()

// Register a user
const registerUser = expressAsyncHandler(async (req: Request, res: Response) => {
    const newUser = await userService.registerUser(req, res)
    res.status(200).json(newUser)
})

// Login user
const loginUser = expressAsyncHandler(async (req: Request, res: Response) => {
    const loginUsr = await userService.loginUser(req, res)
    res.status(200).json(loginUsr)
})

// fetch all users
const allUsers = expressAsyncHandler(async (req: Request, res: Response) => {
    const users = await userService.fetchUsers()
    res.status(200).json(users)
})

// Get one user
const getOne = expressAsyncHandler(async (req: Request, res: Response) => {
    const user = await userService.getUser(req, res)
    res.status(200).json(user)
})

// Update a user
const updateUser = expressAsyncHandler(async (req: Request, res: Response) => {
    const updatedUser = await userService.updateUser(req, res)
    res.status(200).json(updatedUser)
})

// Delete a user
const deleteUser = expressAsyncHandler(async (req: Request, res: Response) => {
    const dltUser = await userService.deleteUser(req, res)
    res.status(200).json(dltUser)
})

export default { registerUser, loginUser, allUsers, deleteUser, updateUser, getOne }
