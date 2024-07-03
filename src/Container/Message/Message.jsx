import React, { useEffect, useState, useContext} from 'react';
import '../../client.js'
import './Message.css'
import io from 'socket.io-client';
import { UserContext } from '../../Components/UserContext.jsx';
// import logo from '../../assets/logo6.png'


const socket = io('http://localhost:8000');

const Message = () => {

   const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [userJoinedMessages, setUserJoinedMessages] = useState([]);
  const { name } = useContext(UserContext);
  
  // const cname = document.getElementById("name").value;
  // console.log(cname);
  // // socket.emit('new-user-joined',cname)
  // setName(cname);

  useEffect(() => {
    if (name) {
      // When the user joins
      socket.emit('new-user-joined', name);

      socket.on('user-joined', (name) => {
        setUserJoinedMessages((prev) => {
          // Check if the user join message already exists
          if (!prev.includes(`${name} joined the chat`)) {
            return [...prev, `${name} joined the chat`];
          }
          return prev;
        });
      });

      // When a message is received
      socket.on('receive', (data) => {
        setMessages((prevMessages) => [...prevMessages, { name: data.name, message: data.message, type: 'left' }]);
      });

      return () => {
        socket.off('user-joined');
        socket.off('receive');
      };
    }
  }, [name]);

  const sendMessage = () => {
    socket.emit('send', message);
    setMessages((prevMessages) => [...prevMessages, { name: 'You', message, type: 'right'}]);
    setMessage('');
  };

  return (
    <>
    <div className='container'>
      {/* <img src={logo} alt="" /> */}
      <h2>Private Chat</h2>
      <div>
        {/* <p className='message right'>you joined the chat</p> */}
        {userJoinedMessages.map((msg,index)=>(
          <p key={index} className='center'>{msg}</p>
        ))}
        {messages.map((msg, index) => (
          <p key={index} className={`message ${msg.type}`}>
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
