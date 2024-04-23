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

let chatMembers = [];

socketIO.on('connection', (socket) => {
  console.log('connection userId: ', socket.id);

  chatMembers.push(socket.id);

  socket.on(
    'sendMessage',
    ({
      type,
      userId,
      message,
      date,
      nickname,
      profileImage,
      attachmentFile,
    }) => {
      socketIO.emit('message', {
        type,
        userId,
        message,
        date,
        nickname,
        profileImage,
        attachmentFile,
      });
    },
  );

  socketIO.emit('chatMembers', { chatMembers });

  socket.on('sendBroadcasting', ({ userId, isTypingMessage }) => {
    socketIO.emit('broadcasting', { userId, isTypingMessage });
  });

  socket.on('sendIsRead', ({ userId, isRead }) => {
    socketIO.emit('isRead', { userId, isRead });
  });

  socket.on('disconnect', () => {
    console.log('disconnect userId: ', socket.id);

    chatMembers = chatMembers.filter((value) => value !== socket.id);
  });
});
