import { OpenDirOptions } from "fs";
import { StatusCategory } from "./StatusCategory";

export class TicketStatus {
	public self: URL;
	public description: string;
	public iconUrl: URL;
	public name: string;
	public untranslatedName: string;
	public id: number;
	public statusCategory: StatusCategory[];
}
