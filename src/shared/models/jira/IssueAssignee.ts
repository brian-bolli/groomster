import { AvatarUrl } from "./AvatarUrl";

export class IssueAssignee {
	public self: URL;
	public accountId: string;
	public emailAddress: string;
	public avatarUrls: AvatarUrl;
	public displayName: string;
	public active: boolean;
	public timeZone: string;
	public accountType: string;
}
