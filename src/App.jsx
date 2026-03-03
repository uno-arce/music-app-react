// Pages
import Login from './pages/Login'
import Register from './pages/Register'
import Homeprofile from './pages/Homeprofile'
import SpotifyCallback from './pages/SpotifyCallback'
import './App.css'

// Routing
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import PublicRoute from './components/PublicRoute'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <Router>
      <Routes>

        <Route
          path='/' 
          element={
            <PublicRoute>
              <Login/>
            </PublicRoute>
          }
        />

        <Route
          path='/login' 
          element={
            <PublicRoute>
              <Login/>
            </PublicRoute>
          }
        />

        <Route
          path='/register'
          element={
            <PublicRoute>
              <Register/>
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

        <Route
          path='/spotify-callback'
          element={
            <ProtectedRoute>
              <SpotifyCallback/>
            </ProtectedRoute>
          }
        />
      </Routes>
    </ Router>
  )
}

export default App
