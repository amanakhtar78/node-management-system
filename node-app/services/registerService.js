import axios from "axios";

export async function registerWithCMS({ port, nodeId, cmsUrl }) {
  try {
    const payload = { nodeId, ip: "localhost", port: String(port) };
    const res = await axios.post(`${cmsUrl}/nodes/register`, payload, {
      timeout: 5000,
    });
    console.log(`[node:${port}] registered -> ${res.data?.message || "ok"}`);
  } catch (err) {
    console.error(`[node:${port}] registration failed: ${err.message}`);
  }
}
