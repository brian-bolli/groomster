import fetch from "node-fetch";
import { HttpMethods } from "Enums";

export class JiraRestRequest<T> {

	private _url: string;
	private _email: string;
	private _token: string;
	private _path: string
	private _method: string;

	constructor(method: HttpMethods, path: string) {
		this._url = process.env.GROOMSTER_ATLASSIAN_API_URL;
		this._email = process.env.GROOMSTER_ATLASSIAN_API_EMAIL;
		this._token = process.env.GROOMSTER_ATLASSIAN_API_TOKEN;
		this._method = method;
		this._path = path;
	}

	async makeRestRequest (): Promise<T> {
		try {
			const result = await fetch(`${this._url}/${this._path}`, {
				method: this._method,
				headers: {
					'Authorization': `Basic ${Buffer.from(
					`${this._email}:${this._token}`
				).toString('base64')}`,
				'Accept': 'application/json'
				}
			});

			const object = await result.json();
			return object as T;
		} catch(e) {
			throw(e);
		}
	}
}
