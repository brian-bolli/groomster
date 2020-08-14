export class JqlIssueSearch {
	public jql: string;
	public maxResults: number = 100;
	public fields: string[] = ["summary", "status", "assignee", "description"];
	public startAt: number = 0;
	constructor(jql: string) {
		this.jql = jql;
	}
}
