import express from 'express'
import { router_setRoutes } from './Router'
import { mongoose } from '@typegoose/typegoose'
import cookieParser from 'cookie-parser'

const connectMongoose = () => {
  return mongoose.connect('mongodb://hans:hans@localhost:27017/admin')
}

class App {
  async init() {
    await connectMongoose()
    const app = express()
    app.disable('x-powered-by')
    app.use(cookieParser())
    app.use(express.json())
    router_setRoutes(app)
    app.listen(3000)
    console.log('listening')
  }
}

export const app = new App()
