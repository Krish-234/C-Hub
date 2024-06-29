const io = require('socket.io');
const cors = require('cors');
const express = require('express');
const app = express();

app.use(cors());

const server = require('http').createServer(app);
const socketIo = require('socket.io')(server, {
    cors: {
        origin: '*', // Allow all origins
        methods: ['GET', 'POST']
    }
});

const users = {};

socketIo.on('connection', socket => {
    socket.on('new-user-joined', name => {
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });

    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] });
    });
});

server.listen(8000, () => {
    console.log('Server is running on  8000');
});
