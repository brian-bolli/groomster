import * as express from 'express';
import * as IO from 'socket.io';

import { Application } from 'express';
import { createServer } from 'http';

import { initializeSocketServer } from './SocketServer';
import { serveHtml, serveBundleJavaScript } from './RouteHandler';

const app: Application = express();
const server = createServer(app);
const io: IO.Server = IO(server, { serveClient: false });

// Configure roads to load index.html and bundle.js
app.get('/', serveHtml);
app.get('/bundle.js', serveBundleJavaScript);

// Initialize Socket Server
initializeSocketServer(io);

// Activate server
server.listen(3000, function(){
  console.log('listening on *:3000');
});


