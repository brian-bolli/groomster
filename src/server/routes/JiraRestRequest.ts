import fetch from "node-fetch";
import { HttpMethods } from "Enums";
import { METHODS } from "http";
import { JqlIssueSearch } from "src/shared/models/jira/JqlIssueSearch";

export class JiraRestRequest<T> {

	private _url: string;
	private _email: string;
	private _token: string;
	private _path: string
	private _method: string;
	private _body: JqlIssueSearch

	constructor(method: HttpMethods, path: string, body?: JqlIssueSearch) {
		this._url = process.env.GROOMSTER_ATLASSIAN_API_URL;
		this._email = process.env.GROOMSTER_ATLASSIAN_API_EMAIL;
		this._token = process.env.GROOMSTER_ATLASSIAN_API_TOKEN;
		this._method = method;
		this._path = path;
		if (body) {
			this._body = body;
		}
	}

	async makeRestRequest (): Promise<T> {
		if (this._method === HttpMethods.POST && this._body) {
			return this.makePostRequest();
		}
		return this.makeGetRequest();
	}

	private async makePostRequest (): Promise<T> {
		try {
			const result = await fetch(`${this._url}/${this._path}`, {
				method: this._method,
				headers: {
					'Authorization': `Basic ${Buffer.from(
					`${this._email}:${this._token}`
				).toString('base64')}`,
				'Accept': 'application/json',
				'Content-Type': 'application/json'
				},
				body: JSON.stringify(this._body)
			});

			const object = await result.json();
			return object as T;
		} catch(e) {
			throw(e);
		}
	}

	private async makeGetRequest (): Promise<T> {
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
