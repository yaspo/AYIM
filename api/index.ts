import "reflect-metadata";
import { App } from "../../CorsaceServer"

const app = new App("ayim")

export default {
    path: "/api",
    handler: app.koa.callback(),
}
