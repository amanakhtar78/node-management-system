# ============================

# Node Management System

# ============================

# OVERVIEW

# CMS + multiple Node Apps simulate distributed nodes.

# CMS can upload a file to all connected nodes and track upload status per node.

# ----------------------------

# INSTALL

# ----------------------------

# Backend - CMS

cd cms
npm install

# Backend - Node App

cd ../node-app
npm install

# Frontend - Vite + React

cd ../frontend
npm install
npm run dev # Frontend available at http://localhost:5173

# ----------------------------

# START SERVERS

# ----------------------------

# Start CMS

cd cms
npm run dev # listens on 3000

# Start Node Apps

cd ../node-app
PORT=4000 npm run dev # first node
PORT=5000 npm run dev # second node

# ----------------------------

# USAGE

# ----------------------------

# Register a Node

curl -X POST http://localhost:3000/nodes/register \
-H "Content-Type: application/json" \
-d '{"nodeId":"node-4000","ip":"localhost","port":"4000"}'

# Upload a File from CMS

curl -F "file=@./example.txt" http://localhost:3000/files/upload

# View Nodes

curl http://localhost:3000/nodes

# ----------------------------

# ENDPOINTS

# ----------------------------

# POST /nodes/register -> Register a node (body: { nodeId, ip, port })

# POST /nodes/disconnect/:nodeId -> Disconnect a node

# GET /nodes -> List all registered nodes

# POST /files/upload -> Upload a file to all connected nodes

# ----------------------------

# NOTES

# ----------------------------

# Database: SQLite at cms/data/nodes.db

# File uploads: cms/uploads and node-app/uploads

# Frontend: Upload page at http://localhost:5173

# File propagation: CMS forwards uploaded files to all connected nodes
