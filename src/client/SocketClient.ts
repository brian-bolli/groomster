
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

export const subscribeToUsersEvent = (cb: Function) => {
	if (socket) {
		socket.on(SocketMessage.USERS, cb);
	}
}

export const subscribeToShowEvent = (cb: Function) => {
	if (socket) {
		socket.on(SocketMessage.SHOW, cb);
	}
}

export const joinRoom = (roomName: string) => {
	if (socket) {
		socket.emit(SocketMessage.ROOM, roomName);
	}
}

export const sendName = (userName: string) => {
	if (socket) {
		socket.emit(SocketMessage.JOINED, userName);
	}
}

export const sendVote = (user: User) => {
	if (socket) {
		socket.emit(SocketMessage.VOTED, user);
	}
}

export const clearVote = (userName: string) => {
	if (socket) {
		socket.emit(SocketMessage.CLEAR, userName);
	}
}

export const showVote = () => {
	if (socket) {
		socket.emit(SocketMessage.SHOW);
	}
}
