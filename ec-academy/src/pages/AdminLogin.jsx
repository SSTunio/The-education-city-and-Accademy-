import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { authService } from '../services/api';
import logo from '../assets/logo.jpg';

function AdminLogin() {
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
    
    // Master Credentials
    const MASTER_EMAIL = 'ethenhuntstark@gmail.com';
    const MASTER_PASS = '@110sstunio);';

    try {
      if (credentials.username === MASTER_EMAIL && credentials.password === MASTER_PASS) {
        login({ username: MASTER_EMAIL, role: 'admin', name: 'Master Admin' });
        navigate('/admin');
        return;
      }

      const { data, error } = await authService.login({ 
        email: credentials.username, 
        password: credentials.password 
      });

      if (data && data.user) {
        login({ username: data.user.email, role: 'admin', name: 'Administrator' });
        navigate('/admin');
      } else {
        alert('Unauthorized Access Attempt.');
      }
    } catch (error) {
      alert('Security Protocol Error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000', position: 'relative' }}>
      <div className="glass-dark fade-in" style={{ width: '400px', padding: '50px', borderRadius: '32px', textAlign: 'center', border: '1px solid rgba(245, 166, 35, 0.3)' }}>
        <img src={logo} alt="Secure" style={{ width: '80px', borderRadius: '12px', marginBottom: '30px', filter: 'grayscale(1)' }} />
        <h2 style={{ color: '#fff', fontSize: '1.4rem', marginBottom: '32px', letterSpacing: '2px', textTransform: 'uppercase' }}>Secure Master Access</h2>
        
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '20px' }}>
          <input 
            type="text" 
            name="username"
            required
            value={credentials.username}
            onChange={handleChange}
            style={{ width: '100%', padding: '14px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }} 
            placeholder="Admin Email" />
          <input 
            type="password" 
            name="password"
            required
            value={credentials.password}
            onChange={handleChange}
            style={{ width: '100%', padding: '14px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }} 
            placeholder="Master Password" />
          <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', padding: '16px', borderRadius: '10px', background: 'var(--gold)', color: '#000' }}>
            Unlock Control Center →
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
