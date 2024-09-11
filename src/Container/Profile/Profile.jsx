import React, { useState } from 'react'
import './Profile.css'
import { useAppStore } from '../../store'

const Profile = () => {
    const {userInfo} = useAppStore();
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [image,setImage] = useState(null);
    const [hovered,setHovered] = useState(false);
    const [selectedcolor,setSelectedColor] = useState(0);

    const saveChanges = async () => {};
  return (
    <div className='app_profile-container'>
      Profile
      <div> Email: {userInfo.email}</div>
    </div>
  )
}

export default Profile
