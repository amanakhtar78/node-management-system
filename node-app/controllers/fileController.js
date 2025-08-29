import fs from "fs";
import path from "path";

const uploadsDir = path.resolve("./node-app/uploads");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

export default {
  upload: (req, res) => {
    try {
      if (!req.file)
        return res
          .status(400)
          .json({ status: "failed", error: "file required" });
      // Multer saved file in uploads dir
      console.log(
        `[node ${process.env.PORT}] Received file ${req.file.originalname}`
      );
      // You could move/rename file as needed. For now respond success.
      return res.json({
        status: "success",
        file: req.file.originalname,
        nodePort: process.env.PORT,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ status: "failed", error: err.message });
    }
  },
};
