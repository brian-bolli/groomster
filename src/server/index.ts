import * as express from 'express';
import * as IO from 'socket.io';

import { Application } from 'express';
import { createServer } from 'http';
import { initializeSocketServer } from './SocketServer';

import * as CookieParser from "cookie-parser";
import * as BodyParser from "body-parser";
import * as ExpressSession from "express-session";
import * as SessionFileStore from "session-file-store";

import JiraProjectRoutes from "./routes/JiraProjectRoutes"
import MainRoutes from "./routes/MainRoutes";

import Passport from "./passport";

const PORT = process.env.PORT || 3000;
const app: Application = express();
const server = createServer(app);
const io: IO.Server = IO(server, { serveClient: false });

const FileStore = SessionFileStore(ExpressSession);

app.use(CookieParser());
app.use(BodyParser.urlencoded({ extended: true }));
app.use(ExpressSession({
	name: 'groomster',
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: false,
	store: new FileStore(),
	cookie: {
		sameSite: true,
		secure: process.env.NODE_ENV === 'production',
		maxAge: 3600000
	}
}));

Passport(app);

app.use(JiraProjectRoutes);
app.use(MainRoutes);

// Initialize Socket Server
initializeSocketServer(io);

// Activate server
server.listen(PORT, function(){
  console.log(`listening on *:${PORT}`);
});


