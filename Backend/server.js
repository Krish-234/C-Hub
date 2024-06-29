const io = require('socket.io');

const users = {};

io.on('connection', name => {
    users[Socket.id] = name;

    Socket.on('new-user-joined', name => {
        socket.broadcast.emit(`${name} joined the chat`);
        }
    )

    


})