// Pages
import Login from './pages/Login'
import Homepage from './pages/Homepage'
import Homeprofile from './pages/Homeprofile'
import './App.css'

// Routing
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { useEffect } from 'react'
import PublicRoute from './components/PublicRoute'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Homepage/>}/>

        <Route
          path='/login' 
          element={
            <PublicRoute>
              <Login/>
            </PublicRoute>
          }
        />

        <Route
          path='/homeprofile'
          element={
            <ProtectedRoute>
              <Homeprofile/>
            </ProtectedRoute>
          }
        />
      </Routes>
    </ Router>
  )
}

export default App
