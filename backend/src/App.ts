import express from "express";
import { Router } from "./Router";

export class App {
  static init() {
    const app = express();
    app.disable("x-powered-by");
    app.use(express.json());
    Router.setRoutes(app);
    app.listen(3000);
  }
}
