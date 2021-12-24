import { NextFunction, Request, Response } from 'express'
import { BaseError } from './errors/BaseError'

export const errorMiddleware = (error: any, req: Request, res: Response, next: NextFunction) => {
  if (!(error instanceof BaseError)) {
    return next(error)
  }
  error.handle(error, req, res, next)
}
