import './App.css'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import Solutions from './pages/Solutions.jsx'
import Features from './pages/Features.jsx'
import Pricing from './pages/Pricing.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import MainLayout from './layout/MainLayout.jsx'
import Appointments from './pages/Appointments.jsx'
import UserStats from './pages/UserStats.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="solutions" element={<Solutions />} />
        <Route path="features" element={<Features />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="insights" element={<UserStats  />} />
      </Route>
    </Routes>
  )
}

export default App