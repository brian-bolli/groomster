import { Router, Request, Response } from "express";
import { resolve } from "path";
import * as PlayerService from "./PlayerService";
import * as RoomService from "./RoomService";

const staticDirectory = resolve(process.cwd(), "dist");

export const serveFaviconRoute = '/favicon.ico';
export const serveFavicon = (_req: Request, res: Response) => {
	res.writeHead(200, { 'Content-Type': 'image/x-icon' });
	res.end();
}

export const serveHtmlRoute = '/';
export const serveHtml = (_req: Request, res: Response) => {
	console.log("/ route hit");
	console.log(_req.session);
	res.sendFile(`${staticDirectory}\\index.html`);
};

export const serveJsRoute = '/bundle.js';
export const serveJs = (_req: Request, res: Response) => {
	console.log("/bundle.js route hit");
	res.sendFile(`${staticDirectory}\\bundle.js`);
};

export const isNameAvailPath = '/name-check/:name';
export const isNameAvail = (req: Request, res: Response) => {
	const name: string = req.params.name;
	const isValid: boolean = PlayerService.validateUniqueName(name);
	res.json({ isValid });
}

export const isRoomNameAvailPath = '/room-check/:name';
export const isRoomNameAvail = (req: Request, res: Response) => {
	const name: string = req.params.name;
	const isValid: boolean = RoomService.validateUniqueName(name);
	res.json({ isValid });
}

export const getRoomsPath = '/rooms';
export const getRooms = (req: Request, res: Response) => {
	const rooms = RoomService.getRooms();
	res.json({ rooms });
}
