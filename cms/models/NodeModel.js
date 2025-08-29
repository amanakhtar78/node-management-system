export default class NodeModel {
  constructor(db) {
    this.db = db;
  }

  async register(node) {
    const { nodeId, ip, port } = node;
    await this.db.run(
      `INSERT OR REPLACE INTO nodes (nodeId, ip, port, connected, lastUploadStatus, lastSeen)
       VALUES (?, ?, ?, 1, COALESCE((SELECT lastUploadStatus FROM nodes WHERE nodeId = ?), 'N/A'), CURRENT_TIMESTAMP)`,
      [nodeId, ip, port, nodeId]
    );
  }

  async disconnect(nodeId) {
    await this.db.run(`UPDATE nodes SET connected = 0 WHERE nodeId = ?`, [
      nodeId,
    ]);
  }

  async updateStatus(nodeId, status) {
    await this.db.run(
      `UPDATE nodes SET lastUploadStatus = ?, connected = 1, lastSeen = CURRENT_TIMESTAMP WHERE nodeId = ?`,
      [status, nodeId]
    );
  }

  async list() {
    return this.db.all(
      `SELECT nodeId, ip, port, connected, lastUploadStatus, lastSeen FROM nodes`
    );
  }

  async getConnectedNodes() {
    return this.db.all(
      `SELECT nodeId, ip, port FROM nodes WHERE connected = 1`
    );
  }
}
