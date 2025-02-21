const handler = require('serve-handler');
const http = require('http');
const compression = require('compression');
const express = require('express');
const config = require('./app.config.js');

const app = express();
app.use(compression());

// Static file serving with proper mime types
app.use((req, res) => {
  return handler(req, res, config);
});

const server = http.createServer(app);

server.listen(config.port, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${config.port}`);
});