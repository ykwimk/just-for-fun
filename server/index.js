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
  console.log('socket: ', socket);
  socketIO.emit('useSuccess', '정상적으로 처리되었습니다.');
});
