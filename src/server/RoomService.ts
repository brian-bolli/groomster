const rooms: string[] = [];

export const validateUniqueName = (name: string): boolean => {
	let response: boolean = true;
	rooms.forEach((room: string) => {
		if (room === name) {
			response = false;
		}
	})
	return response;
}

export const addRoom = (roomName: string): string[] => {
	if (rooms.indexOf(roomName) === -1) {
		rooms.push(roomName);
	}
	return rooms;
}

export const getRooms = () => {
	return rooms;
}
