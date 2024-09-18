import React from 'react'
import './ContactsContainer.css'
import logo from "../../../assets/logo2.png"
import ProfileInfo from './Profile-info/ProfileInfo'

const ContactsContainer = () => {
  return (
    <div className="contacts-container">
      <Logo logo={logo} />
      <Text text="Direct Messages" />
      <Text text="Channels" />
      <ProfileInfo />
    </div>
  )
}

const Logo = ({logo}) => {
  return (
    <div className="logo">
      <img src={logo} alt="Logo" />
    </div>
  );
};

const Text = ({ text }) => {
  return <h6 className='custom-text'>{text}</h6>;
};



export default ContactsContainer
