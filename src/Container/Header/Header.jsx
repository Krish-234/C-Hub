import React,{useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Components/UserContext.jsx';
import './Header.css'

const Header = () => {

  const { name, setName } = useContext(UserContext);

  const navigate = useNavigate();
  const handleNameSubmit = (e) => {
    e.preventDefault();
    setName(e.target.nameInput.value);
    navigate('/message');
  };

  if(name){
    return null;
  }

  return (
    <div className="app_container">
        <h1>Welcome to C-hub!</h1>
         <p> Your Secure and Vibrant Group Chat Platform for Friends, Family, and Communities. <br />
          Enjoy Your Privacy.</p>
          <form action="" onSubmit={handleNameSubmit}>
         <input type="text" placeholder='Enter Your Name....' id="nameInput" required/>
         <button type='submit'>
          Join now
         </button>
          </form>
         <p>Created by <a href="https://github.com/Krish-234/">@Krish-234</a></p>
     </div>
  )
}

export default Header
