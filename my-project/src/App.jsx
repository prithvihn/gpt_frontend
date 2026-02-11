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
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          height: '4rem',
          padding: '0 2rem',
          backgroundColor: 'rgba(15, 23, 42, 0.8)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          borderBottom: '1px solid #334155',
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
              gap: '0.5rem',
              color: '#ffffff',
              marginRight: '2rem',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '1.5rem',
              letterSpacing: '-0.02em',
            }}
          >
            <Sparkles size={22} style={{ color: '#38bdf8' }} aria-hidden="true" />
            GPT
          </Link>

          {['Home', 'About', 'Contact'].map((item) => (
            <Link
              key={item}
              to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
              style={{
                color: '#cbd5e1',
                textDecoration: 'none',
                padding: '0.35rem 0.75rem',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                fontWeight: 500,
                transition: 'color 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#ffffff'
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#cbd5e1'
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
              color: '#e2e8f0',
              textDecoration: 'none',
              padding: '0.625rem 1.5rem',
              borderRadius: '0.5rem',
              fontSize: '0.9rem',
              fontWeight: 500,
              border: '1px solid #475569',
              backgroundColor: 'transparent',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#64748b'
              e.currentTarget.style.backgroundColor = 'rgba(15, 23, 42, 0.6)'
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.borderColor = '#475569'
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
              color: '#ffffff',
              textDecoration: 'none',
              padding: '0.625rem 1.5rem',
              borderRadius: '0.5rem',
              fontSize: '0.9rem',
              fontWeight: 600,
              backgroundColor: '#3b82f6',
              border: 'none',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)'
              e.currentTarget.style.backgroundColor = '#2563eb'
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(59, 130, 246, 0.45)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.backgroundColor = '#3b82f6'
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(59, 130, 246, 0.3)'
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
