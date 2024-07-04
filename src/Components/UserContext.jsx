import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  return (
    <UserContext.Provider value={{ name, setName, room, setRoom }}>
      {children}
    </UserContext.Provider>
  );
};
