import React, { useEffect, useState, useContext} from 'react';
import '../../client.js'
import './Message.css'
import io from 'socket.io-client';
import { UserContext } from '../../Components/UserContext.jsx';

const socket = io('http://localhost:8000');

const Message = () => {

   const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [userJoined, setUserJoined] = useState('');
  const { name } = useContext(UserContext);
  const [position,setPosition] = useState('');
  
  // const cname = document.getElementById("name").value;
  // console.log(cname);
  // // socket.emit('new-user-joined',cname)
  // setName(cname);

  useEffect(() => {
    if (name) {
      // When the user joins
      socket.emit('new-user-joined', name);

      socket.on('user-joined', (name) => {
        setUserJoined(`${name} joined the chat`);
      });

      // When a message is received
      socket.on('receive', (data) => {
        setMessages((prevMessages) => [...prevMessages, { name: data.name, message: data.message }]);
      });

      return () => {
        socket.off('user-joined');
        socket.off('receive');
      };
    }
  }, [name]);

  const sendMessage = () => {
    socket.emit('send', message);
    setMessages((prevMessages) => [...prevMessages, { name: 'You', message }]);
    setMessage('');
  };

  return (
    <>
    <div className='container'>
      <h2>Chat Application</h2>
      <div>
        {userJoined && <p className='message left'>{userJoined}</p>}
        {messages.map((msg, index) => (
          <p key={index} className='message'>
            <strong>{msg.name}:</strong> {msg.message}
          </p>
        ))}
      </div>
      </div>
      <div className='send'>
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
      <button className='btn' onClick={sendMessage}>Send</button>
    
      </div>
    </>
  )
}

export default Message
