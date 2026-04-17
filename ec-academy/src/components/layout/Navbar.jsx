import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.jpg';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="glass-dark" style={{
      height: 'var(--nav-height)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 2rem',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <Link to="/" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <img 
          src={logo} 
          alt="Education City Logo" 
          style={{ 
            height: '45px', 
            width: 'auto', 
            borderRadius: '8px',
            objectFit: 'contain'
          }} 
        />
        <div className="logo-text" style={{ lineHeight: '1.2' }}>
          <div style={{ color: '#fff', fontSize: '16px', fontWeight: '700' }}>Education City</div>
          <div style={{ color: 'var(--gold)', fontSize: '11px' }}>& AI Academy</div>
        </div>
      </Link>
      
      {/* Hamburger Button for Mobile */}
      <button 
        className="mobile-toggle" 
        onClick={toggleMenu}
        style={{ 
          display: 'none', 
          flexDirection: 'column', 
          gap: '5px',
          padding: '5px',
          zIndex: 1100
        }}
      >
        <span style={{ width: '25px', height: '3px', background: '#fff', borderRadius: '3px', transition: '0.3s' }}></span>
        <span style={{ width: '25px', height: '3px', background: '#fff', borderRadius: '3px', transition: '0.3s' }}></span>
        <span style={{ width: '25px', height: '3px', background: '#fff', borderRadius: '3px', transition: '0.3s' }}></span>
      </button>

      {/* Navigation Links */}
      <div className={`nav-links ${isOpen ? 'active' : ''}`} style={{ 
        display: 'flex', 
        gap: '24px', 
        alignItems: 'center',
        transition: '0.3s ease'
      }}>
        <Link to="/" onClick={() => setIsOpen(false)} style={{ color: '#fff', fontSize: '14px' }}>Home</Link>
        <Link to="/#programs" onClick={() => setIsOpen(false)} style={{ color: '#fff', fontSize: '14px' }}>Programs</Link>
        <a href="#location" onClick={() => setIsOpen(false)} style={{ color: '#fff', fontSize: '14px', textDecoration: 'none' }}>Location</a>
        <Link to="/login" onClick={() => setIsOpen(false)} className="btn btn-outline" style={{ color: '#fff', padding: '8px 16px', fontSize: '13px' }}>Student Login</Link>
        <Link to="/register" onClick={() => setIsOpen(false)} className="btn btn-primary" style={{ padding: '8px 20px', fontSize: '13px' }}>Register Now</Link>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .mobile-toggle {
            display: flex !important;
          }

          .logo-text {
            display: none;
          }

          .nav-links {
            position: fixed;
            top: 0;
            right: -100%;
            width: 80%;
            height: 100vh;
            background: var(--navy);
            flex-direction: column;
            justify-content: center;
            padding: 40px;
            box-shadow: -10px 0 30px rgba(0,0,0,0.5);
          }

          .nav-links.active {
            right: 0;
          }

          .nav-links a, .nav-links .btn {
            width: 100%;
            text-align: center;
            font-size: 1.2rem !important;
          }
        }
      `}</style>
    </nav>
  );
}

export default Navbar;
