// Pages
import Login from './pages/Login'
import Homepage from './pages/Homepage'


// Routing
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </ Router>
  )
}

export default App
