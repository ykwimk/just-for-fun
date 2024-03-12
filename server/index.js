const express = require('express');
const cors = require('cors');

const app = express();
const server = require('http').createServer(app);
const socketIO = require('socket.io')(server, { cors: { origin: '*' } });

app.use(cors());

const port = 3030;

server.listen(port, () => {
  console.log('Socket IO server listening on port ' + port);
});

socketIO.on('connection', (socket) => {
  console.log('connection userId: ', socket.id);

  socket.on('sendMessage', ({ type, userId, message, date, nickname }) => {
    socketIO.emit('message', { type, userId, message, date, nickname });
  });

  socket.on('sendBroadcasting', ({ userId, isTypingMessage }) => {
    socketIO.emit('broadcasting', { userId, isTypingMessage });
  });

  socket.on('sendIsRead', ({ userId, isRead }) => {
    socketIO.emit('isRead', { userId, isRead });
  });

  socket.on('disconnect', () => {
    console.log('disconnect userId: ', socket.id);
  });
});
