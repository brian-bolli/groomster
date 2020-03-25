var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

class Player {
    constructor() {
        this.name = '';
        this.vote = null;
    }
}

const users = new Map();
const votes = new Map();

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected: ', socket.id);
  const index = users.size + 1;
  users.set(socket.id, { name: '', vote: null });
  socket.on('joined', (user) => {
    console.log(`User Joined: [${user}]`);
    let u = users.get(socket.id);
    u.name = user;    
    users.set(socket.id, u);
    console.log(users);
    io.emit('users', users);
  });
  socket.on('vote', (msg) => {
    console.log(`Someone Voted: [${msg}]`);
    
    io.emit('voted', users);
  });
});

http.listen(3030, function(){
  console.log('listening on *:3030');
});