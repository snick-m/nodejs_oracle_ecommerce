import "dotenv/config";

import express from 'express';
import path from 'path';

import db from "./database/oracelConnector.js";
import apiRoutes from './routes/index.js';

const app = express();
const port = 8000;

// Serve static files from the public folder
app.use(express.static(path.join(process.cwd(), 'public')));

// API routes
app.use('/api', apiRoutes);

// Start the server
db.then(() => {
  if (!db) {
    throw 'Database connection failed';
  }

  app.use((req, res, next) => {
    req.db = db;
    next();
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}).catch(err => {
  throw err;
});