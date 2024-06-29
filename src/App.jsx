import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./Container/Header/Header"
import Message from './Container/Message/Message';

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/message" element={<Message />} />
      </Routes> 
    </Router>
    </>
  )
}

export default App
