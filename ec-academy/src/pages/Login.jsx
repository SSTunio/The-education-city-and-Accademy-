import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { authService } from '../services/api';
import logo from '../assets/logo.jpg';

function Login() {
  const navigate = useNavigate();
  const { login } = useApp();
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // --- LIVE STUDENT LOGIN ONLY ---
      const res = await authService.studentLogin({
        username: credentials.username,
        password: credentials.password
      });

      if (res.data) {
        login({ 
          username: res.data.username, 
          role: 'student', 
          name: res.data.student_name,
          status: res.data.status 
        });
        navigate('/student');
      } else {
        alert('Invalid student credentials. Please check your username and password.');
      }
    } catch (error) {
      console.error('Auth error:', error);
      alert('Connection Error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section" style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--navy)', position: 'relative', overflow: 'hidden' }}>
      <div className="glass-dark fade-in" style={{ width: 'min(420px, 95vw)', padding: '50px', borderRadius: '32px', textAlign: 'center', boxShadow: '0 40px 100px rgba(0,0,0,0.5)' }}>
        <img src={logo} alt="EC Academy" style={{ width: '100px', borderRadius: '12px', marginBottom: '20px' }} />
        <h2 style={{ color: '#fff', fontSize: '1.8rem', marginBottom: '8px', fontWeight: '800' }}>Student Portal</h2>
        <p style={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: '14px', marginBottom: '32px' }}>Sign in to access your courses and progress</p>
        
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '20px' }}>
          <div style={{ textAlign: 'left' }}>
            <label style={{ fontSize: '12px', fontWeight: '700', color: 'rgba(255, 255, 255, 0.4)', marginBottom: '8px', display: 'block' }}>Username / Email</label>
            <input type="text" name="username" required value={credentials.username} onChange={handleChange} style={{ width: '100%', padding: '14px 18px', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.1)', background: 'rgba(255, 255, 255, 0.05)', color: '#fff', fontSize: '14px' }} placeholder="Enter username" />
          </div>
          <div style={{ textAlign: 'left' }}>
            <label style={{ fontSize: '12px', fontWeight: '700', color: 'rgba(255, 255, 255, 0.4)', marginBottom: '8px', display: 'block' }}>Password</label>
            <input type="password" name="password" required value={credentials.password} onChange={handleChange} style={{ width: '100%', padding: '14px 18px', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.1)', background: 'rgba(255, 255, 255, 0.05)', color: '#fff', fontSize: '14px' }} placeholder="••••••••" />
          </div>
          <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', marginTop: '12px', padding: '16px', borderRadius: '14px', fontWeight: '800' }}>
            {loading ? 'Verifying...' : 'Access Portal →'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
