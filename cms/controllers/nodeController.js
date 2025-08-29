export default function nodeController(NodeModel) {
  return {
    register: async (req, res) => {
      const { nodeId, ip, port } = req.body;
      await NodeModel.register({ nodeId, ip, port });
      res.json({ message: "Node registered", nodeId });
    },

    disconnect: async (req, res) => {
      await NodeModel.disconnect(req.params.nodeId);
      res.json({ message: "Node disconnected" });
    },

    list: async (req, res) => {
      const nodes = await NodeModel.list();
      res.json(nodes);
    },

    event: async (req, res) => {
      res.json({ message: "Event received" });
    },
  };
}
