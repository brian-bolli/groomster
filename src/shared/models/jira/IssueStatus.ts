import { StatusCategory } from "./StatusCategory";

export class IssueStatus {
	public self: URL;
	public description: string;
	public iconUrl: URL;
	public name: string;
	public id: number;
	public statusCategory: StatusCategory;
}
