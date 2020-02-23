import { Config } from "../config";
const config = new Config;
export default {
    serverMiddleware: ["~/api"],
    buildModules: ["@nuxt/typescript-build"],
    server: {
        host: config.ayim.host,
        port: config.ayim.port,
    },
};