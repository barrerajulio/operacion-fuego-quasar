import express, { Request, Response } from "express";

import topSecretRouter from "@modules/top-secret/router";

const router = express.Router();

router.get("/", (_req: Request, res: Response) => {
  return res.json({ Hello: "World Team" });
});

router.get("*", (_req, res): Response => {
  res.status(404);
  return res.json({ error: 404 });
});

router.use("/top-secret", topSecretRouter);

export { router };
