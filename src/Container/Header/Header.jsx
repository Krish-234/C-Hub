import React from 'react'
import { useNavigate } from 'react-router-dom';
import './Header.css'

const Header = () => {

  const navigate = useNavigate();

  const handleJoinNowClick = () => {
    navigate('/message');
  };

  return (
    <div className="app_container">
        <h1>Welcome to C-hub!</h1>
         <p> Your Secure and Vibrant Group Chat Platform for Friends, Family, and Communities. <br />
          Enjoy Your Privacy.</p>
         <button onClick={handleJoinNowClick}>
          Join now
         </button>

         <p>Created by <a href="https://github.com/Krish-234/">@Krish-234</a></p>
     </div>
  )
}

export default Header
