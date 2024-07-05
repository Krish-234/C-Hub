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
    socket.on('join-room', ({ name, room }) => {
        socket.join(room);
        users[socket.id] = { name, room };
        socket.to(room).emit('user-joined', name);
    });

    socket.on('send', ({ message, room }) => {
        socket.to(room).emit('receive', { message: message, name: users[socket.id].name });
    });

    socket.on('disconnect', () => {
        const user = users[socket.id];
        if (user) {
            const { name, room } = user;
            socket.to(room).emit('left', name);
            delete users[socket.id];
        }
    });
});

server.listen(8000, () => {
    console.log('Server is running on 8000');
});
