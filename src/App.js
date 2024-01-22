import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Directory from './Components/JS/Directory';
import ProfilePage from './Components/JS/ProfilePage';
import Test from './Components/JS/Test';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/test' element={<Test />} />
        <Route path='/' element={<Directory />} />
        <Route path='/profile/:id' element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

