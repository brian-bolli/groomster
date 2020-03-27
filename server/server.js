var express = require('express');
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var app = express();
// const users = new Map();
const users = [];
function Player(name, vote = null) {
  this.name = name;
  this.vote = vote;
}

app.get('/', function(req, res){
  res.sendFile(__dirname + './index.html');
});

io.on('connection', function(socket) {
  let _userName;
  console.log('a socket connected: ', socket.id);
  const index = users.size + 1;
  socket.on('joined', (user) => {
    console.log(`A new user Joined: [${user}]`);
    _userName = user;
    users.push(new Player(user));
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

http.listen(3030, function(){
  console.log('listening on *:3030');
});