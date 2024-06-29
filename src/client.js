import io from 'socket.io-client';

const socket = io('http://localhost:8000');

const name = prompt("Enter Your name:");
socket.emit('new-user-joined',name);


