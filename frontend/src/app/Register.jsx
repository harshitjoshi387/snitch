import React, { useState } from 'react';
import './Register.scss';
import { useAuth } from '@/hook/useAuth';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const { handleRegister } = useAuth();

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
    // Optionally redirect to login page here using useNavigate
  };

  return (
    <div className="register-container">
      
      {/* Left side Image Banner */}
      <div className="register-banner">
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
      <div className="register-form-section">
        <div className="register-card">
          
          <div className="mobile-brand">
            <h1>SNITCH</h1>
          </div>

          <div className="header-text">
            <h2>Create an Account</h2>
            <p className="subtitle">Join the exclusive club. Elevate your wardrobe.</p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="name-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
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
                <label htmlFor="lastName">Last Name</label>
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
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="register-btn">
              <span>Create Account</span>
            </button>
          </form>

          <div className="login-link">
            Already a member? <a href="/login">Sign In</a>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Register;
