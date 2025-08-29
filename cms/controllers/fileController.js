import fs from "fs";
import path from "path";
import FormData from "form-data";
import axios from "axios";

const uploadsDir = path.resolve("./cms/uploads");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

export default function makeFileController(NodeModel) {
  return {
    uploadFile: async (req, res) => {
      try {
        if (!req.file)
          return res.status(400).json({ error: "file is required" });

        const filePath = req.file.path;
        const fileName = req.file.originalname;

        const nodes = await NodeModel.getConnectedNodes();
        const results = [];

        for (const node of nodes) {
          try {
            const url = `http://${node.ip}:${node.port}/upload`;

            // Build multipart/form-data request
            const form = new FormData();
            form.append("file", fs.createReadStream(filePath), fileName);
            form.append("fromCMS", "true");

            const headers = form.getHeaders();
            const resp = await axios.post(url, form, {
              headers,
              maxBodyLength: Infinity,
              timeout: 15000,
            });

            if (resp?.data?.status === "success" || resp.status === 200) {
              await NodeModel.updateStatus(node.nodeId, "Success");
              results.push({ nodeId: node.nodeId, status: "Success" });
            } else {
              await NodeModel.updateStatus(node.nodeId, "Failed");
              results.push({ nodeId: node.nodeId, status: "Failed" });
            }
          } catch (err) {
            await NodeModel.updateStatus(node.nodeId, "Failed");
            results.push({
              nodeId: node.nodeId,
              status: "Failed",
              error: err.message,
            });
          }
        }

        // Remove temp uploaded file
        try {
          fs.unlinkSync(filePath);
        } catch (e) {
          /* ignore */
        }

        res.json({ message: "Propagation complete", results });
      } catch (err) {
        console.error("uploadFile error:", err);
        res.status(500).json({ error: err.message });
      }
    },
  };
}
