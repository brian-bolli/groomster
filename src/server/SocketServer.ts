import { Server, Socket } from 'socket.io';
import * as PlayerService from './PlayerService';
import * as RoomService from './RoomService';
import { SocketMessage } from 'Enums';
import { Player } from 'Models';

export const initializeSocketServer = (io: Server): void => {

	io.on(SocketMessage.CONNECTION, (socket: Socket): void => {
		let _roomName: string;
		let _userName: string;
		console.log('a socket connected: ', socket.id);
		socket.emit(SocketMessage.ROOM, RoomService.getRooms());

		const onRoom = (roomName: string) => {
			_roomName = roomName;
			console.log(`joined room ${_roomName}`);
			const rooms = RoomService.addRoom(_roomName);
			socket.join(_roomName);
			socket.emit(SocketMessage.ROOM, RoomService.getRooms());
		}

		const onJoined = (userName: string) => {
			_userName = userName;
			console.log(`A new user Joined: [${userName}]`);
			if (_roomName) {
				io.to(_roomName).emit(SocketMessage.USERS, PlayerService.addPlayer(_userName));
			}
		}

		const onVoted = (player: Player) => {
			if (_roomName) {
				io.to(_roomName).emit(SocketMessage.USERS, PlayerService.playerVoted(player));
			}
		}

		const onShow = () => {
			if (_roomName) {
				io.to(_roomName).emit(SocketMessage.SHOW);
			}
		}

		const onClear = () => {
			if (_roomName) {
				io.to(_roomName).emit(SocketMessage.USERS, PlayerService.clearVotes());
			}
		}

		const onDisconnect = () => {
			console.log(`Player ${_userName} disconnected!`);
			if (_roomName) {
				io.to(_roomName).emit(SocketMessage.USERS, PlayerService.removePlayer(_userName));
			}
		}

		socket.on(SocketMessage.ROOM, onRoom);
		socket.on(SocketMessage.JOINED, onJoined);
		socket.on(SocketMessage.VOTED, onVoted);
		socket.on(SocketMessage.SHOW, onShow);
		socket.on(SocketMessage.CLEAR, onClear);
		socket.on(SocketMessage.DISCONNECT, onDisconnect);
	});


};
