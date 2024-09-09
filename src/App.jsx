import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Homepage } from './component';
import { UserProvider } from './Components/UserContext';

function App() {

  return (
    <>
    <UserProvider>
    <Router>
      <Routes>
        <Route path="/auth" element={<Homepage />} />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes> 
    </Router>
    </UserProvider>
    </>
  )
}

export default App
