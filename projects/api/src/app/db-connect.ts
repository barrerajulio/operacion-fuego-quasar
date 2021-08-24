import mysql2 from "mysql2";
import { Dialect } from "sequelize";
import { Sequelize } from "sequelize-typescript";

import MessageSequelizeModel from "@app/repositories/mysql/models/message.sequelize.model";

export interface IDbParams {
  username: string;
  password: string;
  connectTimeout: number;
  port: number;
  database: string;
  host: string;
  logging?: boolean;
  prefix?: string;
  timezone?: string;
  dialect?: Dialect;
}

const dbConnect = async (params: IDbParams): Promise<Sequelize> => {
  const {
    connectTimeout,
    database,
    host,
    logging,
    password,
    prefix,
    port,
    timezone,
    username,
  } = params;
  const sequelize = new Sequelize({
    database,
    dialectModule: mysql2,
    username,
    password,
    host,
    port,
    dialect: params.dialect ? params.dialect : "mysql",
    pool: {
      max: 30,
      min: 1,
      idle: 100,
    },
    timezone: timezone || "-06:00",
    logging:
      /* eslint-disable @typescript-eslint/no-empty-function */
      logging ? console.log : (): void => {},
    dialectOptions: {
      timezone: timezone || "-06:00",
      connectTimeout,
    },
    hooks: {
      beforeDefine: (_columns, model): void => {
        model.tableName = `${prefix ? prefix : ""}${model.tableName}`;
      },
    },
  });
  sequelize.addModels([MessageSequelizeModel]);
  await sequelize.authenticate();
  return sequelize;
};

export default dbConnect;
