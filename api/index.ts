import "reflect-metadata";
import { Config } from "../../config"
import { App } from "../../commonRoutes"

const config = new Config()
const app = new App(config.ayim.publicURL)

export default {
    path: "/api",
    handler: app.koa.callback(),
}
