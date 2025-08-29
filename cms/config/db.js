import fs from "fs";
import path from "path";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

const dataDir = path.resolve("./cms/data");
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

export async function initDB() {
  const db = await open({
    filename: path.join(dataDir, "nodes.db"),
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS nodes (
      nodeId TEXT PRIMARY KEY,
      ip TEXT,
      port TEXT,
      connected INTEGER DEFAULT 0,
      lastUploadStatus TEXT,
      lastSeen DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  return db;
}
