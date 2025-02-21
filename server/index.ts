import express from 'express';
import { WebSocketServer } from 'ws';
import { createServer } from 'http';
import compression from 'compression';
import serveHandler from 'serve-handler';
import config from '../app.config.js';

const app = express();

// Enable compression for all responses
app.use(compression());

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Static file serving with proper mime types
app.use(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    await serveHandler(req, res, {
      public: config.publicDir,
      cleanUrls: config.cleanUrls,
      directoryListing: config.directoryListing,
      rewrites: config.rewrites,
      headers: config.headers
    });
  } catch (error) {
    next(error);
  }
});

const httpServer = createServer(app);

// WebSocket server on a different path to avoid conflicts with Vite HMR
const wss = new WebSocketServer({ server: httpServer, path: '/ws' });

wss.on('connection', (ws) => {
  console.log('New WebSocket connection');

  ws.on('message', (message) => {
    // Echo back messages for now
    if (ws.readyState === ws.OPEN) {
      ws.send(`Server received: ${message}`);
    }
  });
});

const PORT = Number(process.env.PORT) || 5000;
httpServer.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${PORT}`);
});