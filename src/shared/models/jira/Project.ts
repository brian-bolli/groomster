import { Url } from "url";
import { AvatarUrl } from "./AvatarUrl";

export class Project {
	public expand: string;
	public self: Url;
	public id: number;
	public key: string;
	public name: string;
	public avatarUrls: AvatarUrl[];
	public projectType: string;
	public simplified: boolean;
	public style: string;
	public isPrivate: boolean;
	public properties: any[];
}
