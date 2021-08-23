import "reflect-metadata";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import serverless from "serverless-http";

import "@app/app/container";
import responseExceptionMiddleware from "./middlewares/response-exception";
import { router } from "./router";

export const hello = async (
  event: AWSLambda.APIGatewayProxyEvent,
  context: AWSLambda.Context
) => {
  const app: any = express();
  app.use(express.text());
  app.use(express.urlencoded());
  app.use(express.json());
  app.use(express.raw());
  app.use(
    "/v1",
    cors({
      origin: "*",
    }),
    router
  );
  app.use(function (_: Request, res: Response, next: NextFunction) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "DELETE, PUT, GET, POST");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, custom-yay-partial, workspace"
    );
    next();
  });

  app.use(responseExceptionMiddleware);
  router.all("*", (_: Request, res: Response): Response => {
    res.status(404);
    return res.json({ error: 404 });
  });

  const serverlessApp = serverless(app);
  return serverlessApp(event, context);
};
