import * as express from 'express';
import * as IO from 'socket.io';

import { Application } from 'express';
import { createServer } from 'http';

import { initializeSocketServer } from './SocketServer';
import * as RouteHandler from './RouteHandler';

import * as CookieParser from "cookie-parser";
import * as BodyParser from "body-parser";
import * as ExpressSession from "express-session";

import Passport from "./passport";

const PORT = process.env.PORT || 3000;
const app: Application = express();
const server = createServer(app);
const io: IO.Server = IO(server, { serveClient: false });

app.use(CookieParser());
app.use(BodyParser.urlencoded({ extended: true }));
app.use(ExpressSession({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

Passport(app);

// Configure roads to load index.html and bundle.js
app.get(RouteHandler.serveFaviconRoute, RouteHandler.serveFavicon);
app.get(RouteHandler.serveHtmlRoute, RouteHandler.serveHtml);
app.get(RouteHandler.serveJsRoute, RouteHandler.serveJs);
app.get(RouteHandler.isNameAvailPath, RouteHandler.isNameAvail);
app.get(RouteHandler.isRoomNameAvailPath, RouteHandler.isRoomNameAvail);

// Initialize Socket Server
initializeSocketServer(io);

// Activate server
server.listen(PORT, function(){
  console.log(`listening on *:${PORT}`);
});


