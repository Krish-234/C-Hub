import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Homepage,Message,Header } from './component';
import { UserProvider } from './Components/UserContext';

function App() {

  return (
    <>
    <UserProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/guest" element={<Header />} />
        <Route path="/message" element={<Message />} />
      </Routes> 
    </Router>
    </UserProvider>
    </>
  )
}

export default App
