import React from 'react'
import Absen  from './components/Absensi'
import HomePage from './components/HomePage'
import {BrowserRouter, Routes ,Route} from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Absen/>} />


    </Routes>
    
    
    </BrowserRouter>

  )
}

export default App
