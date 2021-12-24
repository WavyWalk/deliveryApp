import { NextFunction, Request, Response } from 'express'

export interface ErrorOptions {
  statusCode?: number
  responseJson?: Object
  statusOnly?: boolean
  message?: string
}

export class BaseError extends Error {
  options: ErrorOptions

  protected constructor(options: ErrorOptions) {
    super(options.message)
    options.statusCode ??= 500
    options.statusOnly ??= true
    options.responseJson ??= {}
    this.options = options
  }

  handle = async (error: Error, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
      return next(error)
    }
    if (this.options.statusOnly) {
      return res.send(this.options.statusCode)
    }
    return res.status(this.options.statusCode!).send(this.options.responseJson)
  }
}
