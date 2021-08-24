import express, { Request, Response } from "express";

import container from "./app/container";
import Symbols from "./modules/top-secret/symbols";
import { TopSecretController } from "./modules/top-secret/controllers/top-secret.controller";

const router = express.Router();
const controller = container.get<TopSecretController>(
  Symbols.TopSecretController
);

router.get("/", (_req: Request, res: Response) => {
  return res.json({ Hello: "World Team" });
});

router.post("/top_secret", controller.receiveMessage.bind(controller));
router.post(
  "/top_secret_split/:satelliteName",
  controller.receivePartialMessage.bind(controller)
);
router.get("/top_secret_split", controller.decodeMessage.bind(controller));

router.get("*", (_req, res): Response => {
  res.status(404);
  return res.json({ error: 404 });
});

export { router };
