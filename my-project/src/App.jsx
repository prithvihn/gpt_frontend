import React, { useEffect, useState, useMemo } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom'
import { LogIn, Menu, UserPlus, Sparkles, Search } from 'lucide-react'
import './App.css'
import Home from './pages/home'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Signup from './pages/Signup'

function App() {
  const loadStoredSessions = () => {
    try {
      const raw = localStorage.getItem('chat_sessions')
      if (!raw) return []
      const parsed = JSON.parse(raw)
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  }

  const [isAuthenticated, setIsAuthenticated] = useState(
    () => !!localStorage.getItem('access_token'),
  )
  const [chatSessions, setChatSessions] = useState(loadStoredSessions)
  const [activeSessionId, setActiveSessionId] = useState(() => {
    const storedActive = localStorage.getItem('active_chat_id')
    if (storedActive) return storedActive
    const sessions = loadStoredSessions()
    return sessions[0]?.id || ''
  })
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredSessions = useMemo(() => {
    if (!searchQuery.trim()) return chatSessions
    const q = searchQuery.toLowerCase()
    return chatSessions.filter((s) => s.title.toLowerCase().includes(q))
  }, [chatSessions, searchQuery])

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === 'access_token') {
        setIsAuthenticated(!!event.newValue)
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  useEffect(() => {
    if (chatSessions.length === 0) {
      const id = Date.now().toString()
      const firstSession = {
        id,
        title: 'New Chat',
        createdAt: new Date().toISOString(),
        messages: [],
      }
      setChatSessions([firstSession])
      setActiveSessionId(id)
    }
  }, [chatSessions.length])

  useEffect(() => {
    localStorage.setItem('chat_sessions', JSON.stringify(chatSessions))
  }, [chatSessions])

  useEffect(() => {
    if (activeSessionId) {
      localStorage.setItem('active_chat_id', activeSessionId)
    }
  }, [activeSessionId])

  const updateSessionMessages = (sessionId, newMessages) => {
    setChatSessions((prev) =>
      prev.map((session) => {
        if (session.id !== sessionId) return session
        const firstUserMessage = newMessages.find(
          (m) => m.role === 'user' && m.content?.trim(),
        )
        let title = firstUserMessage?.content?.trim() || 'New Chat'
        if (title.length > 40) {
          title = `${title.slice(0, 40)}…`
        }
        return {
          ...session,
          messages: newMessages,
          title,
        }
      }),
    )
  }

  const handleNewChat = () => {
    const id = Date.now().toString()
    const newSession = {
      id,
      title: 'New Chat',
      createdAt: new Date().toISOString(),
      messages: [],
    }
    setChatSessions((prev) => [...prev, newSession])
    setActiveSessionId(id)
    setIsSidebarOpen(false)
  }

  const handleLogout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('token_type')
    localStorage.removeItem('user_email')
    localStorage.removeItem('chat_sessions')
    localStorage.removeItem('active_chat_id')
    setChatSessions([])
    setActiveSessionId('')
    setIsSidebarOpen(false)
    setIsAuthenticated(false)
  }

  const currentUserEmail = localStorage.getItem('user_email') || ''

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
        {/* Left side — Hamburger + Logo + Nav Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            type="button"
            aria-label="Open sidebar"
            onClick={() => setIsSidebarOpen(true)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '2.25rem',
              height: '2.25rem',
              borderRadius: '9999px',
              border: '1px solid #1f2937',
              backgroundColor: 'rgba(15,23,42,0.9)',
              color: '#e5e7eb',
              cursor: 'pointer',
            }}
          >
            <Menu size={18} />
          </button>

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

        {/* Right side — Auth Buttons / Logout */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          {isAuthenticated ? (
            <Link
              to="/"
              onClick={handleLogout}
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
              Logout
            </Link>
          ) : (
            <>
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
                  e.currentTarget.style.boxShadow =
                    '0 6px 20px rgba(59, 130, 246, 0.45)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.backgroundColor = '#3b82f6'
                  e.currentTarget.style.boxShadow =
                    '0 2px 8px rgba(59, 130, 246, 0.3)'
                }}
              >
                <UserPlus size={16} />
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Sidebar & overlay */}
      {isSidebarOpen && (
        <>
          <div
            onClick={() => setIsSidebarOpen(false)}
            style={{
              position: 'fixed',
              top: '4rem',
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(15,23,42,0.65)',
              zIndex: 900,
            }}
          />
          <aside
            style={{
              position: 'fixed',
              top: '4rem',
              left: 0,
              bottom: 0,
              width: '17rem',
              backgroundColor: 'rgba(15,23,42,0.98)',
              borderRight: '1px solid #1f2937',
              boxShadow: '8px 0 25px rgba(0,0,0,0.6)',
              zIndex: 950,
              padding: '1rem 0.75rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
            }}
          >
            <button
              type="button"
              onClick={handleNewChat}
              style={{
                width: '100%',
                padding: '0.6rem 0.75rem',
                borderRadius: '0.75rem',
                border: '1px solid rgba(148,163,184,0.5)',
                background:
                  'linear-gradient(135deg, rgba(59,130,246,0.9), rgba(37,99,235,0.9))',
                color: '#f9fafb',
                fontSize: '0.92rem',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 8px 18px rgba(37,99,235,0.6)',
              }}
            >
              New Chat
            </button>

            {/* Sidebar search */}
            <div className="sidebar-search-wrapper">
              <Search size={14} className="sidebar-search-icon" />
              <input
                type="text"
                placeholder="Search chats…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="sidebar-search-input"
              />
            </div>

            <div
              style={{
                fontSize: '0.8rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                color: '#9ca3af',
                padding: '0.25rem 0.25rem',
              }}
            >
              Chat History
            </div>

            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                paddingRight: '0.25rem',
              }}
            >
              {isAuthenticated ? (
                <>
                  {filteredSessions.map((session) => {
                    const isActive = session.id === activeSessionId
                    return (
                      <button
                        key={session.id}
                        type="button"
                        onClick={() => {
                          setActiveSessionId(session.id)
                          setIsSidebarOpen(false)
                        }}
                        style={{
                          width: '100%',
                          textAlign: 'left',
                          padding: '0.55rem 0.6rem',
                          marginBottom: '0.35rem',
                          borderRadius: '0.6rem',
                          border: '1px solid rgba(55,65,81,0.85)',
                          backgroundColor: isActive
                            ? 'rgba(30,64,175,0.8)'
                            : 'rgba(15,23,42,0.85)',
                          color: '#e5e7eb',
                          fontSize: '0.86rem',
                          cursor: 'pointer',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                        title={session.title}
                      >
                        {session.title}
                      </button>
                    )
                  })}
                  {filteredSessions.length === 0 && (
                    <p
                      style={{
                        fontSize: '0.8rem',
                        color: '#6b7280',
                        padding: '0.35rem 0.25rem',
                      }}
                    >
                      {searchQuery.trim() ? 'No matching chats.' : 'No conversations yet.'}
                    </p>
                  )}
                </>
              ) : (
                <p
                  style={{
                    fontSize: '0.8rem',
                    color: '#6b7280',
                    padding: '0.35rem 0.25rem',
                  }}
                >
                  Log in to see your chat history.
                </p>
              )}
            </div>

            <div
              style={{
                borderTop: '1px solid #1f2937',
                paddingTop: '0.6rem',
                fontSize: '0.8rem',
                color: '#9ca3af',
              }}
            >
              {currentUserEmail ? (
                <span>Logged in as {currentUserEmail}</span>
              ) : (
                <span>Not logged in</span>
              )}
            </div>
          </aside>
        </>
      )}

      <Routes>
        <Route
          path="/"
          element={
            <Home
              activeSessionId={activeSessionId}
              chatSessions={chatSessions}
              onUpdateSessionMessages={updateSessionMessages}
            />
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  )
}

export default App
