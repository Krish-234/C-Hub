import React, { useEffect } from "react";
import "./ContactsContainer.css";
import logo from "../../../assets/logo2.png";
import ProfileInfo from "./Profile-info/ProfileInfo";
import NewDM from "../../../Components/NewDM/NewDM";
import { apiClient } from "../../../lib/api-client";
import { GET_DM_CONTACTS_ROUTES } from "../../../utils/constants";

const ContactsContainer = () => {

  useEffect(()=>{
   const getContacts = async () => {
    const res = await apiClient.get(GET_DM_CONTACTS_ROUTES,{
      withCredentials:true,
    });
    if(res.data.contacts){
      console.log(res.data.contacts);
    }
   };

   getContacts();
  },[])

  return (
    <div className="contacts-container">
      <div>
        <Logo logo={logo} />
      </div>
      <div className="contacts_dm">
        <Text text="Direct Messages" />
        <NewDM />
      </div>
      <div>
        <Text text="Channels" />
      </div>
      <ProfileInfo />
    </div>
  );
};

const Logo = ({ logo }) => {
  return (
    <div className="logo">
      <img src={logo} alt="Logo" />
    </div>
  );
};

const Text = ({ text }) => {
  return <h6 className="custom-text">{text}</h6>;
};

export default ContactsContainer;
