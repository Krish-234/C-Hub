import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./Container/Header/Header"
import Message from './Container/Message/Message';
import { UserProvider } from './Components/UserContext';

function App() {

  return (
    <>
    <UserProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/message" element={<Message />} />
      </Routes> 
    </Router>
    </UserProvider>
    </>
  )
}

export default App
