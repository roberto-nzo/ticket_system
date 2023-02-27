import { NextFunction, Request, Response } from 'express'

const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
    const statusCode = res.statusCode ? res.statusCode : 500
    res.status(statusCode)
    res.json({
        message: err.message,
        stack: err.stack
    })
}

export default errorMiddleware 
