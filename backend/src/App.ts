import express, { Express } from 'express'
import { router_setRoutes } from './Router'
import { mongoose } from '@typegoose/typegoose'
import cookieParser from 'cookie-parser'
import * as http from 'http'
import { Server as SocketServer } from 'socket.io'
import { attachSocketBaseHandlers } from './sockets/attachSocketBaseHandlers'
import { Server } from 'http'

const connectMongoose = () => {
  return mongoose.connect('mongodb://hans:hans@localhost:27017/admin')
}

const prepareHttpApp = () => {
  const app = express()
  app.disable('x-powered-by')
  app.use(cookieParser())
  app.use(express.json())
  router_setRoutes(app)
  return app
}

const prepareSocketApp = (server: Server) => {
  const io = new SocketServer(server)
  attachSocketBaseHandlers(io)
  return io
}

class App {
  socketServer!: SocketServer

  async init() {
    await connectMongoose()
    const httpApp = prepareHttpApp()
    const server = http.createServer(httpApp)
    this.socketServer = prepareSocketApp(server)
    server.listen(3000)
    console.log('listening')
  }
}

export const app = new App()
