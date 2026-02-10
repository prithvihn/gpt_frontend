import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'

function App() {
  return (
    <Router>
      <nav
        style={{
          padding: '1rem',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <Link to="/" style={{ color: 'white', marginRight: '1rem', textDecoration: 'none' }}>
          Home
        </Link>
        <Link to="/about" style={{ color: 'white', marginRight: '1rem', textDecoration: 'none' }}>
          About
        </Link>
        <Link to="/contact" style={{ color: 'white', textDecoration: 'none' }}>
          Contact
        </Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  )
}

export default App
