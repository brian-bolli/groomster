import { IssueSearchResultFields } from "./IssueSearchResultFields";

export class IssueSearchResult {
	public expand: string;
	public id: number;
	public self: URL;
	public key: string;
	public fields: IssueSearchResultFields;
}
