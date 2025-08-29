import express from "express";
import morgan from "morgan";
import cors from "cors";
import fileRoutes from "./routes/fileRoutes.js";
import { registerWithCMS } from "./services/registerService.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 4000;
const CMS_URL = process.env.CMS_URL || "http://localhost:3000";
const NODE_ID = process.env.NODE_ID || `node-${PORT}`;

const app = express();
app.use(cors());
app.use(morgan("dev"));

app.use("/", fileRoutes);

app.listen(PORT, async () => {
  console.log(`Node app listening on http://localhost:${PORT}`);
  // attempt registration with CMS
  await registerWithCMS({ port: PORT, nodeId: NODE_ID, cmsUrl: CMS_URL });
});
