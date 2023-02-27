import jwt from 'jsonwebtoken'
import expressAsyncHandler from 'express-async-handler'
import models from '../models/index'
import { Response } from 'express'


class Protection {
    protect_mainAdmin = expressAsyncHandler(async (req: any, res: Response, next) => {
        let token

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            try {
                token = req.headers.authorization.split(' ')[1]

                const decoded: any = jwt.verify(token, process.env.JWT_SECRET!)

                if (token && decoded.roleId === 1) {
                    req.user = await models.User.findByPk(decoded.id, {
                        attributes: {
                            exclude: ['password']
                        }
                    })
                } else {
                    res.status(400)
                    throw new Error('Access denied')
                }

                next()
            } catch (error) {
                res.status(401)
                throw new Error('Not authorized')
            }
        }

        if (!token) {
            res.status(401)
            throw new Error('Not authorized, no token')
        }
    })

    protect_admin = expressAsyncHandler(async (req: any, res: Response, next) => {
        let token

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            try {
                token = req.headers.authorization.split(' ')[1]

                const decoded: any = jwt.verify(token, process.env.JWT_SECRET!)
                console.log(decoded.roleId)

                if (token && [1, 2].includes(decoded.roleId)) {
                    req.user = await models.User.findByPk(decoded.id, {
                        attributes: {
                            exclude: ['password']
                        }
                    })
                } else {
                    res.status(400)
                    throw new Error('Access denied')
                }

                next()
            } catch (error) {
                res.status(401)
                throw new Error('Not authorized')
            }
        }

        if (!token) {
            res.status(401)
            throw new Error('Not authorized, no token')
        }
    })

    protect = expressAsyncHandler(async (req: any, res: Response, next) => {
        let token

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            try {
                token = req.headers.authorization.split(' ')[1]

                const decoded: string | any = jwt.verify(token, process.env.JWT_SECRET!)

                if (token) {
                    req.user = await models.User.findByPk(decoded.id, {
                        attributes: {
                            exclude: ['password']
                        }
                    })
                } else {
                    res.status(400)
                    throw new Error('Access denied')
                }

                next()
            } catch (error) {
                res.status(401)
                throw new Error('Not authorized')
            }
        }

        if (!token) {
            res.status(401)
            throw new Error('Not authorized, no token')
        }
    })

}


export default Protection