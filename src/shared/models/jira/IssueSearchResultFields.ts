import { IssueAssignee } from "./IssueAssignee";
import { IssueStatus } from "./IssueStatus";

export class IssueSearchResultFields {
	public summary: string;
	public description: string;
	public assignee: IssueAssignee;
	public status: IssueStatus;
}
