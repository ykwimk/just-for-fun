const express = require('express');
const cors = require('cors');

const app = express();
const server = require('http').createServer(app);
const socketIO = require('socket.io')(server, { cors: { origin: '*' } });

app.use(cors());

const port = 5000;

server.listen(port, () => {
  console.log('Socket IO server listening on port ' + port);
});

socketIO.on('connection', (socket) => {
  console.log('connection userId: ', socket.id);

  socket.on('sendMessage', ({ userId, message, date }) => {
    socketIO.emit('message', { userId, message, date });
  });

  socket.on('disconnect', () => {
    console.log('disconnect userId: ', socket.id);
  });
});
