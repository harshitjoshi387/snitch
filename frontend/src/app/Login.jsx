import React, { useState, useEffect } from 'react';
import './Login.scss';
import { useAuth } from '@/hook/useAuth';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const { handleLogin } = useAuth();
  const navigate = useNavigate();
  const { Loading, error, user } = useSelector(state => state.auth);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin(formData.email, formData.password);
  };

  useEffect(() => {
    if (user) {
       navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className="login-container">
      
      {/* Left side Image Banner */}
      <div className="login-banner">
        <div className="brand-overlay">
          <h1>SNITCH</h1>
          <p>Menswear</p>
        </div>
        <div className="quote-overlay">
          <p>"Style is a way to say who you are without having to speak."</p>
          <div className="author">— Premium Collection</div>
        </div>
      </div>

      {/* Right side Form */}
      <div className="login-form-section">
        <div className="login-card">
          
          <div className="mobile-brand">
            <h1>SNITCH</h1>
          </div>

          <div className="header-text">
            <h2>Welcome Back</h2>
            <p className="subtitle">login in to access your exclusive club.</p>
          </div>
          
          {error && <div className="error-message" style={{color: '#ff4c4c', marginBottom: '15px', fontSize: '14px'}}>{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="login-btn" disabled={Loading}>
              <span>{Loading ? 'Loging In...' : 'Login'}</span>
            </button>
          </form>

          <div className="register-link">
            Not a member yet? <a href="/register">Create Account</a>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Login;
