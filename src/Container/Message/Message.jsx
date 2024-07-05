import React, { useEffect, useState, useContext } from 'react';
import './Message.css';
import io from 'socket.io-client';
import { UserContext } from '../../Components/UserContext.jsx';

const socket = io('http://localhost:8000');

const Message = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const { name, room } = useContext(UserContext);

  useEffect(() => {
    if (name && room) {
      socket.emit('join-room', { name, room });

      socket.on('user-joined', (name) => {
        setMessages((prevMessages) => [...prevMessages, { message: `${name} joined the chat`, type: 'center' }]);
      });

      socket.on('receive', (data) => {
        setMessages((prevMessages) => [...prevMessages, { message: `${data.name}: ${data.message}`, type: 'left' }]);
      });

      socket.on('left', (name) => {
        setMessages((prevMessages) => [...prevMessages, { message: `${name} left the chat`, type: 'center' }]);
      });

      return () => {
        socket.off('user-joined');
        socket.off('receive');
        socket.off('left');
      };
    }
  }, [name, room]);

  const sendMessage = () => {
    socket.emit('send', { message, room });
    setMessages((prevMessages) => [...prevMessages, { message: `${message}`, type: 'right' }]);
    setMessage('');
  };

  return (
    <>
      <div className="container">
        <h1>{room}</h1>
        <div className="join_msg">
          <p className="center">You joined the chat</p>
          {messages.map((msg, index) => (
            <p key={index} className={`${msg.type}`}>
              {msg.message}
            </p>
          ))}
        </div>
      </div>
      <div className="send">
        <input
          type="text"
          placeholder="Type a message"
          value={message}
          id="messageInput"
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              sendMessage();
            }
          }}
        />
        <button className="btn" onClick={sendMessage}>Send</button>
      </div>
    </>
  );
};

export default Message;
