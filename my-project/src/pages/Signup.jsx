import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Sparkles } from 'lucide-react';

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Signup successful:', data);
        navigate('/login');
      } else {
        setError(data.detail || 'Signup failed. Please try again.');
      }
    } catch (err) {
      console.error('Signup error:', err);
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="gradient-bg flex items-center justify-center px-4 py-8"
      style={{ minHeight: 'calc(100vh - 52px)' }}
    >
      <div
        className="glass-card animate-fade-in-up"
        style={{ width: '100%', maxWidth: '26rem', padding: '2.5rem 2rem' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '3.5rem',
              height: '3.5rem',
              borderRadius: '1rem',
              background:
                'linear-gradient(135deg, rgba(168, 85, 247, 0.3), rgba(236, 72, 153, 0.3))',
              marginBottom: '1rem',
            }}
          >
            <Sparkles size={28} style={{ color: '#c084fc' }} />
          </div>
          <h2
            style={{
              color: 'white',
              fontSize: '1.6rem',
              fontWeight: 700,
              marginBottom: '0.4rem',
            }}
          >
            Create account
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>
            Sign up to get started
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {error && (
            <p
              className="error-msg"
              style={{
                textAlign: 'center',
                marginBottom: '1rem',
                background: 'rgba(255,0,0,0.1)',
                padding: '5px',
                borderRadius: '4px',
              }}
            >
              {error}
            </p>
          )}

          <div style={{ marginBottom: '1rem' }}>
            <div className="input-wrapper">
              <Mail size={18} className="input-icon" />
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                className="input-field"
                disabled={loading}
              />
            </div>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <div className="input-wrapper">
              <Lock size={18} className="input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="input-field"
                style={{ paddingRight: '2.75rem' }}
                disabled={loading}
              />
              <button
                type="button"
                className="input-toggle"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <div className="input-wrapper">
              <Lock size={18} className="input-icon" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="input-field"
                style={{ paddingRight: '2.75rem' }}
                disabled={loading}
              />
              <button
                type="button"
                className="input-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                tabIndex={-1}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              fontSize: '1rem',
              padding: '0.85rem',
            }}
          >
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <p
          style={{
            textAlign: 'center',
            color: 'rgba(255,255,255,0.6)',
            fontSize: '0.9rem',
            marginTop: '1.5rem',
          }}
        >
          Already have an account?{' '}
          <Link to="/login" className="auth-link">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;