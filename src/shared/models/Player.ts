export class Player {
	public name: string;
	public vote: number | null;
	constructor(name: string) {
		this.name = name;
		this.vote = null;
	}
}
