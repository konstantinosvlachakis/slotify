import './App.css'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import Solutions from './pages/Solutions.jsx'
import Features from './pages/Features.jsx'
import Pricing from './pages/Pricing.jsx'
import Login from './Login.jsx'
import MainLayout from './layout/MainLayout.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="solutions" element={<Solutions />} />
        <Route path="features" element={<Features />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  )
}

export default App