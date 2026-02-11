import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom' // Added useNavigate for redirection
import { Mail, Lock, Eye, EyeOff, LogIn, Sparkles } from 'lucide-react'

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [shakeField, setShakeField] = useState('')
  
  const navigate = useNavigate(); // Hook to redirect user after login

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const newErrors = {}
    if (!form.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    if (!form.password) {
      newErrors.password = 'Password is required'
    }
    return newErrors
  }

  const triggerShake = (field) => {
    setShakeField(field)
    setTimeout(() => setShakeField(''), 500)
  }

  // --- CONNECTED LOGIC START ---
  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = validate()
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      triggerShake(Object.keys(newErrors)[0])
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('http://127.0.0.1:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // 1. Store tokens in localStorage
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);
        localStorage.setItem('token_type', data.token_type);

        console.log('Login successful');
        
        // 2. Redirect to home page after login
        navigate('/'); 
      } else {
        // Handle 422 or 401 errors from backend
        setErrors({ server: data.detail || 'Invalid credentials' });
        triggerShake('password');
      }
    } catch (error) {
      setErrors({ server: 'Backend server is not responding.' });
    } finally {
      setIsLoading(false)
    }
  }
  // --- CONNECTED LOGIC END ---

  return (
    <div className="gradient-bg flex items-center justify-center px-4 py-8"
      style={{ minHeight: 'calc(100vh - 52px)' }}
    >
      <div className="glass-card animate-fade-in-up" style={{ width: '100%', maxWidth: '26rem', padding: '2.5rem 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '3.5rem', height: '3.5rem', borderRadius: '1rem', background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.3), rgba(236, 72, 153, 0.3))', marginBottom: '1rem' }}>
            <Sparkles size={28} style={{ color: '#c084fc' }} />
          </div>
          <h2 style={{ color: 'white', fontSize: '1.6rem', fontWeight: 700, marginBottom: '0.4rem' }}>Welcome back</h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>Sign in to continue</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Display Server Errors */}
          {errors.server && <p className="error-msg" style={{ textAlign: 'center', marginBottom: '1rem', background: 'rgba(255,0,0,0.1)', padding: '5px', borderRadius: '4px' }}>{errors.server}</p>}

          <div style={{ marginBottom: '1rem' }}>
            <div className={`input-wrapper ${shakeField === 'email' ? 'animate-shake' : ''}`}>
              <Mail size={18} className="input-icon" />
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={form.email}
                onChange={handleChange}
                className={`input-field ${errors.email ? 'error' : ''}`}
              />
            </div>
            {errors.email && <p className="error-msg">{errors.email}</p>}
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <div className={`input-wrapper ${shakeField === 'password' ? 'animate-shake' : ''}`}>
              <Lock size={18} className="input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className={`input-field ${errors.password ? 'error' : ''}`}
                style={{ paddingRight: '2.75rem' }}
              />
              <button type="button" className="input-toggle" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && <p className="error-msg">{errors.password}</p>}
          </div>

          <button type="submit" className="btn-primary" disabled={isLoading} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontSize: '1rem', padding: '0.85rem' }}>
            {isLoading ? <span className="loader-spinner" /> : <><LogIn size={18} /> Sign In</>}
          </button>
        </form>

        <div className="divider">or continue with</div>
        {/* ... Social buttons remain the same ... */}
        
        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', marginTop: '1.5rem' }}>
          Don't have an account? <Link to="/signup" className="auth-link">Sign up</Link>
        </p>
      </div>
    </div>
  )
}

export default Login