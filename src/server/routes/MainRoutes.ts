import { Router, Request, Response } from "express";
import { resolve } from "path";

import * as PlayerService from "../PlayerService";
import * as RoomService from "../RoomService";

const mainRoutes = Router();
const staticDirectory = resolve(process.cwd(), "dist");

mainRoutes.get('/favicon.ico', (_req: Request, res: Response) => {
	res.writeHead(200, { 'Content-Type': 'image/x-icon' });
	res.end();
});

mainRoutes.get('/', (_req: Request, res: Response) => {
	console.log("/ route hit");
	console.log(_req.session);
	res.sendFile(`${staticDirectory}\\index.html`);
});

mainRoutes.get('/bundle.js', (_req: Request, res: Response) => {
	console.log("/bundle.js route hit");
	res.sendFile(`${staticDirectory}\\bundle.js`);
});

mainRoutes.get('/name-check/:name', (req: Request, res: Response) => {
	const name: string = req.params.name;
	const isValid: boolean = PlayerService.validateUniqueName(name);
	res.json({ isValid });
});

mainRoutes.get('/room-check/:name', (req: Request, res: Response) => {
	const name: string = req.params.name;
	const isValid: boolean = RoomService.validateUniqueName(name);
	res.json({ isValid });
});

export default mainRoutes;
