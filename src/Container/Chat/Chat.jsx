import React, { useEffect } from 'react'
import './Chat.css'
import { useAppStore } from '../../store'
import { useNavigate } from 'react-router-dom';

const Chat = () => {
    const {userInfo} = useAppStore();
    const navigate = useNavigate();

    useEffect(() => {
        if(!userInfo.profileSetup){
            alert('Please setup profile to continue.');
            navigate("/profile");
        }
    },[userInfo,navigate]);
    
  return (
    <div className='app_chat-container'>
      Chat
    </div>
  )
}

export default Chat
