import express from "express";
import multer from "multer";
import path from "path";
import fileController from "../controllers/fileController.js";

const upload = multer({
  dest: path.resolve("./node-app/uploads"),
  limits: { fileSize: 50 * 1024 * 1024 },
});

const router = express.Router();
router.post("/upload", upload.single("file"), fileController.upload);

export default router;
