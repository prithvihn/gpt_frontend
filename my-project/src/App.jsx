import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { LogIn, UserPlus, Sparkles } from 'lucide-react'
import './App.css'
import Home from './pages/home'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Signup from './pages/Signup'

function App() {
  return (
    <Router>
      <nav
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          padding: '0.75rem 1.5rem',
          backgroundColor: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Left side — Logo + Nav Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              color: 'white',
              marginRight: '1.5rem',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '1.15rem',
              letterSpacing: '-0.02em',
            }}
          >
            <Sparkles size={20} style={{ color: '#c084fc' }} />
            GPT
          </Link>

          {['Home', 'About', 'Contact'].map((item) => (
            <Link
              key={item}
              to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
              style={{
                color: 'rgba(255, 255, 255, 0.7)',
                textDecoration: 'none',
                padding: '0.4rem 0.85rem',
                borderRadius: '0.5rem',
                fontSize: '0.9rem',
                fontWeight: 500,
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.target.style.color = 'white'
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.08)'
              }}
              onMouseLeave={(e) => {
                e.target.style.color = 'rgba(255, 255, 255, 0.7)'
                e.target.style.backgroundColor = 'transparent'
              }}
            >
              {item}
            </Link>
          ))}
        </div>

        {/* Right side — Auth Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <Link
            to="/login"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              color: 'rgba(255, 255, 255, 0.85)',
              textDecoration: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '0.6rem',
              fontSize: '0.875rem',
              fontWeight: 500,
              border: '1px solid rgba(255, 255, 255, 0.15)',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)'
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            <LogIn size={16} />
            Login
          </Link>

          <Link
            to="/signup"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              color: 'white',
              textDecoration: 'none',
              padding: '0.5rem 1.15rem',
              borderRadius: '0.6rem',
              fontSize: '0.875rem',
              fontWeight: 600,
              background: 'linear-gradient(135deg, #a855f7, #ec4899)',
              border: 'none',
              transition: 'all 0.25s ease',
              boxShadow: '0 2px 10px rgba(168, 85, 247, 0.3)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)'
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(168, 85, 247, 0.45)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 2px 10px rgba(168, 85, 247, 0.3)'
            }}
          >
            <UserPlus size={16} />
            Sign Up
          </Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  )
}

export default App
