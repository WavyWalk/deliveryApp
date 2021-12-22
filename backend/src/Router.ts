import express from "express";
import path from "path";
import { PROJECT_DIR } from "./index";

export class Router {
  static setRoutes(app: express.Application) {
    app.use("/", express.static(`./public/dist`));
    const apiRouter = express.Router({ mergeParams: true });
    app.use("/api", apiRouter);
    app.get("*", (req, res) => {
      res.sendFile(`${PROJECT_DIR}/public/dist/index.html`);
    });
  }
}
