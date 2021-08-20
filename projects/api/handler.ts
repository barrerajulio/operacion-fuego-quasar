import cors from "cors";
import express from "express";
import serverless from "serverless-http";

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
  app.use("/v1", cors(), router);

  const serverlessApp = serverless(app);
  return serverlessApp(event, context);
};
