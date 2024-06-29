import React from 'react'
import logo from '../../assets/logo.png'
import './Message.css'
import '../../client.js'

const Message = () => {
  return (
    <>
    <div className='container'>
    <h2>Welcome to the Message Page!</h2>
    {/* <img src={logo} alt="" /> */}
      <p className='message left'> 
        hello 
      </p>
      <p className='message right'>
        Hi
      </p>
    </div>
    <div className='send'>
    <form action="#" id='send-container' >
        <input type="text" name='messageInput' id="messageInput" placeholder='Type your message....'/>
        <button className='btn' type='submit'>
            send
        </button>
    </form>
    </div>
    </>
  )
}

export default Message
