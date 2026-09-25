import React, { useState } from 'react';
import '@/features/auth/styles/Register.scss';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useNavigate } from 'react-router';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const { handleRegister } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullName = `${formData.firstName} ${formData.lastName}`;
    await handleRegister(fullName, formData.email, formData.password, '', false);
    alert("Registration successful! You can now login.");
  };

  return (
    <div className="register-page">
     
      
      {/* Navbar */}
      <nav className="register-navbar">
        <div className="logo">AURA<span>.STUDIO</span></div>
        <div className="nav-links">
          <a href="/men">MEN</a>
          <a href="/women">WOMEN</a>
          <a href="/sneakers">SNEAKERS</a>
          <a href="/accessories">ACCESSORIES</a>
        </div>
      </nav>

      <div className="register-container">
        {/* Left banner */}
        <div className="register-banner">
          <div className="banner-badge">SEASON 04 CAPSULE LIVE</div>

          

          <div className="banner-features">
            <div className="feature">
              <span className="icon">⚡</span>
              <div>
                <strong>Flat 10% Off</strong>
                <p>on first order</p>
              </div>
            </div>
            <div className="feature">
              <span className="icon">🎯</span>
              <div>
                <strong>Early Access</strong>
                <p>24h before public release</p>
              </div>
            </div>
            
            <div className="feature">
              <span className="icon">🚚</span>
              <div>
                <strong>Priority Dispatch</strong>
                <p>doorstep speed pickup</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right form section */}
        <div className="register-form-section">
          <div className="form-tabs">
            <button
              className="tab"
              type="button"
              onClick={() => navigate('/login')}
            >
              LOG IN
            </button>
            <button className="tab tab--active" type="button">
              REGISTER / NEW ACCOUNT
            </button>
          </div>

          <div className="register-card">
            <h2>CREATE AN ACCOUNT</h2>
            <p className="subtitle">
              Join the exclusive club. Elevate your wardrobe.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="name-row">
                <div className="form-group">
                  <label htmlFor="firstName">FIRST NAME</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="Enter first name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="lastName">LAST NAME</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Enter last name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email">EMAIL</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">PASSWORD</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="proceed-btn">
                CREATE ACCOUNT <span>→</span>
              </button>
            </form>

            <div className="divider">
              <span>or</span>
            </div>

            <a href="http://localhost:3000/api/auth/google" className="google-btn">
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>Continue with Google</span>
            </a>

            <div className="login-link">
              Already a member? <a href="/login">Sign In</a>
            </div>
          </div>

          <div className="trust-row">
            <div className="trust-item">
              <span>🛡️</span>
              <div>
                <strong>100% GENUINE</strong>
                <p>Direct Official Merch</p>
              </div>
            </div>
            <div className="trust-item">
              <span>↩️</span>
              <div>
                <strong>30 DAYS RETURN</strong>
                <p>Instant Doorstep Pickup</p>
              </div>
            </div>
            <div className="trust-item">
              <span>🔒</span>
              <div>
                <strong>SAFE & PRIVATE</strong>
                <p>PCI-DSS Compliant</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;