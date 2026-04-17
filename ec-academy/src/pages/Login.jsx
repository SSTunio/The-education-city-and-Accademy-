import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { authService } from '../services/api';
import logo from '../assets/logo.jpg';

function Login() {
  const navigate = useNavigate();
  const { login } = useApp();
  const [role, setRole] = useState('student'); // 'student' or 'admin'
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (role === 'admin') {
        // Aligned with Report: Using Supabase Auth for Admin
        const { data, error } = await authService.login({ 
          email: credentials.username, 
          password: credentials.password 
        });

        if (error) {
          alert(`Login Failed: ${error.message}`);
        } else if (data.user) {
          login({ 
            username: data.user.email, 
            role: 'admin', 
            name: 'Administrator',
            id: data.user.id 
          });
          navigate('/admin');
        }
      } else {
        // Student login (Local fallback for now)
        if (credentials.username === 'student' && credentials.password === 'student123') {
          login({ username: 'student', role: 'student', name: 'Ahmad Ali' });
          navigate('/student');
        } else {
          alert('Invalid student credentials. Use student/student123');
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
      alert('An unexpected error occurred. Check console.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section" style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--navy)', position: 'relative', overflow: 'hidden' }}>
      {/* Background Gradients */}
      <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(0, 201, 167, 0.1) 0%, transparent 70%)' }}></div>
      <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(245, 166, 35, 0.1) 0%, transparent 70%)' }}></div>

      <div className="glass-dark fade-in" style={{ width: 'min(420px, 95vw)', padding: '50px', borderRadius: '32px', textAlign: 'center', boxShadow: '0 40px 100px rgba(0,0,0,0.5)' }}>
        <img 
          src={logo} 
          alt="EC Academy" 
          style={{ width: '120px', height: 'auto', borderRadius: '12px', marginBottom: '20px' }} 
        />
        
        <h2 style={{ color: '#fff', fontSize: '1.8rem', marginBottom: '8px', fontWeight: '800' }}>Portal Access</h2>
        <p style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '14px', marginBottom: '32px' }}>Welcome back to the Future of Learning</p>
        
        {/* Role Switcher */}
        <div style={{ display: 'flex', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px', padding: '5px', marginBottom: '32px' }}>
          <button 
            type="button"
            onClick={() => setRole('student')}
            style={{ 
              flex: 1, padding: '10px', borderRadius: '8px', fontSize: '13px', fontWeight: '700',
              background: role === 'student' ? '#fff' : 'transparent',
              color: role === 'student' ? 'var(--navy)' : 'rgba(255,255,255,0.5)'
            }}>Student</button>
          <button 
            type="button"
            onClick={() => setRole('admin')}
            style={{ 
              flex: 1, padding: '10px', borderRadius: '8px', fontSize: '13px', fontWeight: '700',
              background: role === 'admin' ? '#fff' : 'transparent',
              color: role === 'admin' ? 'var(--navy)' : 'rgba(255,255,255,0.5)'
            }}>Admin</button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '20px' }}>
          <div style={{ textAlign: 'left' }}>
            <label style={{ fontSize: '12px', fontWeight: '700', color: 'rgba(255, 255, 255, 0.4)', marginBottom: '8px', display: 'block', textTransform: 'uppercase', letterSpacing: '1px' }}>Email Address</label>
            <input 
              type="text" 
              name="username"
              required
              value={credentials.username}
              onChange={handleChange}
              style={{ width: '100%', padding: '14px 18px', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.1)', background: 'rgba(255, 255, 255, 0.05)', color: '#fff', fontSize: '14px', outline: 'none' }} 
              placeholder="Enter your email" />
          </div>
          <div style={{ textAlign: 'left' }}>
            <label style={{ fontSize: '12px', fontWeight: '700', color: 'rgba(255, 255, 255, 0.4)', marginBottom: '8px', display: 'block', textTransform: 'uppercase', letterSpacing: '1px' }}>Password</label>
            <input 
              type="password" 
              name="password"
              required
              value={credentials.password}
              onChange={handleChange}
              style={{ width: '100%', padding: '14px 18px', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.1)', background: 'rgba(255, 255, 255, 0.05)', color: '#fff', fontSize: '14px', outline: 'none' }} 
              placeholder="••••••••" />
          </div>
          <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', marginTop: '12px', padding: '16px', borderRadius: '14px', fontWeight: '800' }}>
            {loading ? 'Verifying...' : 'Sign In →'}
          </button>
        </form>

        <p style={{ marginTop: '32px', fontSize: '13px', color: 'rgba(255, 255, 255, 0.4)' }}>
          New student? <a href="/register" style={{ color: 'var(--gold)', fontWeight: '700' }}>Apply for Admission</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
