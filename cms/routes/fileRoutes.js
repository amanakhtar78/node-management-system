import express from "express";
import multer from "multer";
import path from "path";

const upload = multer({
  dest: path.resolve("./cms/uploads"),
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
});

export default function makeFileRoutes(fileController) {
  const router = express.Router();
  router.post("/upload", upload.single("file"), fileController.uploadFile);
  return router;
}
