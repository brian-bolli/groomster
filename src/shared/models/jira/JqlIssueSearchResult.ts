import { IssueSearchResult } from "./IssueSearchResult";

export class JqlIssueSearchResult {
	public expand: string;
	public startAt: number;
	public maxResults: number;
	public total: number;
	public issues: IssueSearchResult[];
}
