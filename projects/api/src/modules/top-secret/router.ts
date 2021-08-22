import express from "express";

import container from "@app/app/container";
import Symbols from "./symbols";
import { TopSecretController } from "./controllers/top-secret.controller";

const controller = container.get<TopSecretController>(
  Symbols.TopSecretController
);
const router = express.Router();
router.post("/", controller.receiveMessage.bind(controller));

export default router;
