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
  const [userLeft,setUserLeft] = useState([]);
  const { name } = useContext(UserContext);
  
  // const cname = document.getElementById("name").value;
  // console.log(cname);
  // // socket.emit('new-user-joined',cname)
  // setName(cname);

  useEffect(() => {
    if (name) {
      // When the user joins
      socket.emit('new-user-joined', name);
      console.log(name);

      socket.on('user-joined', (name) => {
        setMessages((prevMessages) => [...prevMessages, { name, message: `${name} joined the chat`, type: 'center' }]);
        // setUserJoinedMessages((prev) => [...prev, `${name} joined the chat`]);

        // setUserJoinedMessages((prev) => {
        //   // Check if the user join message already exists
        //   if (!prev.includes(`${name} joined the chat`)) {
        //     return [...prev, `${name} joined the chat`];
        //   }
        //   return prev;
        // });
      });

      // When a message is received
      socket.on('receive', (data) => {
        setMessages((prevMessages) => [...prevMessages, {  message:`${data.name}: ${data.message}`, type: 'left' }]);
      });

      socket.on('left', (name) => {
        setMessages((prevMessages) => [...prevMessages, {name ,message: `${name} left the chat`, type: 'center' }]);
      });


      return () => {
        socket.off('user-joined');
        socket.off('receive');
        socket.off('left');
      };
    }
  }, [name]);

  const sendMessage = () => {
    socket.emit('send', message);
    setMessages((prevMessages) => [...prevMessages, {  message: `You: ${message}`, type: 'right'}]);
    setMessage('');
  };

  return (
    <>
    <div className='container'>
      <h2>Private Chat</h2>
        <div className='join_msg'>
        <p className='center'>You joined the chat</p>
        {messages.map((msg, index) => (
          <p key={index} className={`${msg.type}`}>
            {msg.message}
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
