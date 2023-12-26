import React from 'react'
import { BrowserRouter , Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import SingIn from './pages/SingIn'

import Profile from './pages/Profile'
import SingUp from './pages/SingUp'
import About from './pages/About'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/sing-in' element={<SingIn/>}/>
        <Route path='/sing-up' element={<SingUp/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/about' element={<About/>}/>
      </Routes>
    </BrowserRouter>
  )
}
