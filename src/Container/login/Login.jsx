import React from 'react'

const Login = () => {
  return (
    <div className="app_container">
      <h1>Welcome to C-hub!</h1>
      <p>
      Your Secure and Vibrant Group Chat Platform for Friends, Family, and Communities. <br />Chat, Share, and Stay Connected.
      </p>
      <div className='user_info'>
      <form onSubmit={handleNameSubmit}>
        <input type="text" placeholder="Enter Your Name...." id="nameInput" required />
        <input type="text" placeholder="Enter Room Name...." id="roomInput" required />
        <button type="submit">Join now</button>
      </form>
      </div>
      <p>Created by <a href="https://github.com/Krish-234/">@Krish-234</a></p>
    </div>
  )
}

export default Login
