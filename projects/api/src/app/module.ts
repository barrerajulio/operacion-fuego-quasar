import { ContainerModule } from "inversify";

import { GlobalTokens } from "./tokens";

const module = new ContainerModule((bind) => {
  bind(GlobalTokens.DATABASE_PARAMS).toConstantValue({
    connectTimeout: parseInt(process.env["DATABASE_CONNECT_TIMEOUT"]!),
    database: process.env["DATABASE_NAME"]!,
    host: process.env["DATABASE_HOST"]!,
    timezone: process.env["DATABASE_TIMEZONE"]!,
    password: process.env["DATABASE_PASSWORD"]!,
    port: parseInt(process.env["DATABASE_PORT"]!),
    username: process.env["DATABASE_USERNAME"]!,
    dialect: "mysql",
    logging: true,
    prefix: process.env["DATABASE_PREFIX"]!,
  });
});

export default module;
