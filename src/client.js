// import React, { useEffect, useState } from 'react';
// import io from 'socket.io-client';
// const socket = io('http://localhost:8000');

// const messageInput = document.getElementById("messageInput");
// const container = document.querySelector('.container');
// const name = document.getElementById("name");

// const append = (message,position) => {
//     const messageElement = document.createElement("div");
//     messageElement.innerText = message;
//     messageElement.className = "message";
//     messageElement.className = (position);
//     container.append(messageElement);
// };

// socket.emit('new-user-joined',name);

// socket.on("user-joined", data => {
//     append(`${name}joined the chat`,'left');
// });

