import { Server, Socket } from 'socket.io';
import * as PlayerService from './PlayerService';
import { SocketMessage } from 'Enums';
import { Player } from 'Models';

export const initializeSocketServer = (io: Server): void => {

	io.on(SocketMessage.CONNECTION, (socket: Socket): void => {
		let _userName: string;
		console.log('a socket connected: ', socket.id);

		const onJoined = (userName: string) => {
			_userName = userName;
			console.log(`A new user Joined: [${userName}]`);
			io.emit(SocketMessage.USERS, PlayerService.addPlayer(_userName));
		}

		const onVoted = (player: Player) => {
			io.emit(SocketMessage.USERS, PlayerService.playerVoted(player));
		}

		const onClear = () => {
			io.emit(SocketMessage.USERS, PlayerService.clearVotes());
		}

		const onDisconnect = () => {
			console.log(`Player ${_userName} disconnected!`);
			io.emit(SocketMessage.USERS, PlayerService.removePlayer(_userName));
		}

		socket.on(SocketMessage.JOINED, onJoined);
		socket.on(SocketMessage.VOTED, onVoted);
		socket.on(SocketMessage.CLEAR, onClear);
		socket.on(SocketMessage.DISCONNECT, onDisconnect);
	});


};
