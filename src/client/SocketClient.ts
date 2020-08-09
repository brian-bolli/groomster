
import io from "socket.io-client";
import { SocketMessage } from "../shared/enums";
import { User } from "./components/PointingSession";

let socket: SocketIOClient.Socket;

export const initiateSocket = () => {
	socket = io();
}

export const diconnectSocket = () => {
	if (socket) {
		socket.disconnect();
	}
}

export const subscribeToRoomsMenu = (cb: Function) => {
	if (socket) {
		socket.on(SocketMessage.ROOM, cb);
	}
}

export const subscribeToJoined = (cb: Function) => {
	if (socket) {
		socket.on(SocketMessage.USERS, (users: User[]) => {
			cb(null, users);
		});
	}
}

export const joinRoom = (roomName: string, cb: Function) => {
	if (socket) {
		socket.emit(SocketMessage.ROOM, roomName);
	}
}

export const sendName = (userName: string, cb: Function) => {
	if (socket) {
		socket.emit(SocketMessage.JOINED, userName);
	}
}

export const sendVote = (name: string, vote: number | null) => {
	if (socket) {
		socket.emit(SocketMessage.VOTED, { name, vote });
	}
}

export const clearVote = (userName: string, cb: Function) => {
	if (socket) {
		socket.emit(SocketMessage.CLEAR, userName);
	}
}
