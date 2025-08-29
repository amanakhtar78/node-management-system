import express from "express";
import cors from "cors";
import morgan from "morgan";

import { initDB } from "./config/db.js";
import NodeModel from "./models/NodeModel.js";
import makeNodeController from "./controllers/nodeController.js";
import makeFileController from "./controllers/fileController.js";
import makeNodeRoutes from "./routes/nodeRoutes.js";
import makeFileRoutes from "./routes/fileRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const PORT = process.env.PORT || 3000;

(async () => {
  const db = await initDB();
  const nodeModel = new NodeModel(db);

  const nodeController = makeNodeController(nodeModel);
  const fileController = makeFileController(nodeModel);

  app.use("/nodes", makeNodeRoutes(nodeController));
  app.use("/files", makeFileRoutes(fileController));

  app.listen(PORT, () => {
    console.log(`CMS listening at http://localhost:${PORT}`);
  });
})();
