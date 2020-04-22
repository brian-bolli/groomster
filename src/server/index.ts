import * as express from 'express';
import * as IO from 'socket.io';
import { Application, Request, Response } from 'express';
import { createServer } from 'http';
import { resolve } from 'path';

const app: Application = express();
const server = createServer(app);
const io: IO.Server = IO(server, { serveClient: false });

const staticDirectory = resolve(process.cwd(), 'dist');

class Player {
	public name: string;
	public vote: number | null;
	constructor(name: string) {
		this.name = name;
		this.vote = null;
	}
  }

const users: Player[] = [];

app.get('/', (_req: Request, res: Response) => {
  console.log('/ route hit');
  res.sendFile(`${staticDirectory}\\index.html`);
});

app.get('/bundle.js', (_req: Request, res: Response) => {
  console.log('/bundle.js route hit');
  res.sendFile(`${staticDirectory}\\bundle.js`);
});

io.on('connection', (socket: IO.Socket ) => {

  let _userName: string;
  console.log('a socket connected: ', socket.id);

  socket.on('joined', (user) => {
    console.log(`A new user Joined: [${user}]`);
    _userName = user;
	users.push(new Player(user));
	console.log(users);
    io.emit('users', users);
  });

  socket.on('voted', (data) => {
    users.forEach((user) => {
      if (user.name === data.name) {
        user.vote = data.vote;
      }
    });
    io.emit('users', users);
  });

  socket.on('clear', (user) => {
    users.forEach(u => u.vote = null);
    io.emit('users', users);
  });

  socket.on('disconnect', () => {
    const index = users.findIndex((e) => e.name === _userName);
    if (index > -1) {
      users.splice(index, 1);
    } else {
      console.log('disconnect without a user');
    }
    io.emit('users', users);
  });

});

server.listen(3000, function(){
  console.log('listening on *:3000');
});


