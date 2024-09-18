import React from 'react'
import './ChatContainer.css'
import { RiCloseFill } from 'react-icons/ri'
import {ChatHeader,MessageContainer,MessageBar} from '../index.js'

const ChatContainer = () => {
  return (
    <div className='chat_container-background'>
   <ChatHeader />
   <MessageContainer />
   <MessageBar />
    </div>
  )
}


export default ChatContainer
