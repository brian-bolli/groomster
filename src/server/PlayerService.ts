import { Player } from 'Models';

const players: Player[] = [];

export const validateUniqueName = (name: string): boolean => {
	let response: boolean = true;
	players.forEach((player: Player) => {
		if (player.name === name) {
			response = false;
		}
	})
	return response;
}

export const addPlayer = (userName: string): Player[] => {
	players.push(new Player(userName));
	return players;
}

export const playerVoted = (player: Player): Player[] => {
	players.forEach((p: Player) => {
		if (p.name === player.name) {
			p.vote = player.vote;
		}
	});
	return players;
}

export const clearVotes = (): Player[] => {
	players.forEach((p: Player) => p.vote = null);
	return players;
};

export const removePlayer = (userName: string): Player[] => {
	const index = players.findIndex((player: Player) => player.name === userName);
	if (index > -1) {
		players.splice(index, 1);
	  } else {
		console.log('disconnect without a user');
	  }
	return players;
}
