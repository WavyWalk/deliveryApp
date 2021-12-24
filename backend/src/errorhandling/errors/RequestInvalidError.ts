import { BaseError } from './BaseError'

export class RequestInvalidError extends BaseError {
  constructor() {
    super({ statusCode: 400, statusOnly: true })
  }
}
