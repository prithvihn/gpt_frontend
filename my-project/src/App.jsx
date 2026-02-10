import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'

function App() {
  return (
    <Router>
      <nav style={{ padding: '1rem', backgroundColor: '#333', marginBottom: '1rem' }}>
        <Link to="/" style={{ color: 'white', marginRight: '1rem' }}>Home</Link>
        <Link to="/about" style={{ color: 'white', marginRight: '1rem' }}>About</Link>
        <Link to="/contact" style={{ color: 'white' }}>Contact</Link>
      </nav>
<h1 className="text-3xl font-bold underline">
    Hello world!
  </h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  )
}

export default App
