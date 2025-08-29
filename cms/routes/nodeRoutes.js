import express from "express";

export default function makeNodeRoutes(controller) {
  const router = express.Router();
  router.post("/register", controller.register);
  router.post("/disconnect/:nodeId", controller.disconnect);
  router.get("/", controller.list);
  router.post("/event", controller.event);
  return router;
}
