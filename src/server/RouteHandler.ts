import { Request, Response } from "express";
import { resolve } from "path";

const staticDirectory = resolve(process.cwd(), "dist");

export const serveHtml = (_req: Request, res: Response) => {
	console.log("/ route hit");
	res.sendFile(`${staticDirectory}\\index.html`);
};

export const serveBundleJavaScript = (_req: Request, res: Response) => {
	console.log("/bundle.js route hit");
	res.sendFile(`${staticDirectory}\\bundle.js`);
};
