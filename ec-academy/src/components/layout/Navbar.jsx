import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import logo from '../../assets/logo.jpg';

function Navbar() {
  const { user, logout } = useApp();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Programs', path: '/#programs' },
    { label: 'Location', path: '/#location' },
  ];

  return (
    <nav className="navbar" style={{ 
      background: 'rgba(255, 255, 255, 0.95)', 
      backdropFilter: 'blur(10px)', 
      padding: '12px 0', 
      position: 'sticky', 
      top: 0, 
      zIndex: 1000, 
      borderBottom: '1px solid var(--border)' 
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Logo Section */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <img src={logo} alt="EC Academy" style={{ width: '40px', height: '40px', borderRadius: '10px' }} />
          <div>
            <div style={{ fontWeight: '800', color: 'var(--navy)', fontSize: '1.1rem', lineHeight: '1' }}>EC Academy</div>
            <div style={{ fontSize: '9px', color: 'var(--teal)', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase' }}>Education City</div>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="desktop-menu" style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
          {navLinks.map((link, i) => (
            <a key={i} href={link.path} className="nav-link" style={{ fontSize: '14px', fontWeight: '600' }}>{link.label}</a>
          ))}
          
          {user?.role === 'admin' && (
            <Link to="/admin" className="nav-link" style={{ color: 'var(--teal)', fontWeight: '800', fontSize: '14px' }}>Admin</Link>
          )}

          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--navy)' }}>{user.name}</span>
              <button onClick={handleLogout} className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '11px' }}>Logout</button>
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary" style={{ padding: '8px 20px', fontSize: '13px' }}>Login</Link>
          )}
        </div>

        {/* Mobile Toggle Button */}
        <button 
          className="mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{ display: 'none', fontSize: '24px', color: 'var(--navy)' }}
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="mobile-menu-overlay" style={{
          position: 'fixed',
          top: '65px',
          left: 0,
          width: '100%',
          background: '#fff',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          zIndex: 999,
          borderBottom: '4px solid var(--gold)'
        }}>
          {navLinks.map((link, i) => (
            <a key={i} href={link.path} onClick={() => setMobileMenuOpen(false)} style={{ padding: '12px', fontWeight: '700', color: 'var(--navy)', borderBottom: '1px solid #f0f0f0' }}>{link.label}</a>
          ))}
          {user?.role === 'admin' && (
            <Link to="/admin" onClick={() => setMobileMenuOpen(false)} style={{ padding: '12px', fontWeight: '800', color: 'var(--teal)' }}>Admin Dashboard</Link>
          )}
          {user ? (
            <button onClick={handleLogout} className="btn btn-outline" style={{ width: '100%', padding: '15px' }}>Logout ({user.name})</button>
          ) : (
            <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="btn btn-primary" style={{ width: '100%', padding: '15px' }}>Sign In</Link>
          )}
        </div>
      )}

      <style>{`
        @media (max-width: 850px) {
          .desktop-menu { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </nav>
  );
}

export default Navbar;
