var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var path = require('path');

const staticDirectory = path.resolve(__dirname, '../client/dist/');
console.log('static directory -> ', staticDirectory);
// const users = new Map();
const users = [];
function Player(name, vote = null) {
  this.name = name;
  this.vote = vote;
}

// app.use(express.static(staticDirectory));

app.get('/', function(req, res){
  console.log('/ route hit');
  res.sendFile(`${staticDirectory}/index.html`);
});

app.get('/bundle.js', function(req, res){
  console.log('/bundle.js route hit');
  res.sendFile(`${staticDirectory}/bundle.js`);
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