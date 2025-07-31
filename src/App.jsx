// Pages
import Login from './pages/Login'
import Homepage from './pages/Homepage'
import './App.css'

// Routing
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { useEffect } from 'react'
import userAuth from './services/userAuth'

function App() {
  useEffect(() => {
    // return userAuth.verify()
  }, [])

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
