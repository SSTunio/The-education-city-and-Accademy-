import React from 'react';
import logo from '../../assets/logo.jpg';

function Footer() {
  return (
    <footer style={{
      background: 'var(--navy)',
      padding: '80px 2rem 40px',
      color: '#fff',
      borderTop: '1px solid rgba(255, 255, 255, 0.05)'
    }}>
      <div className="container" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '60px',
        marginBottom: '60px'
      }}>
        <div className="footer-info">
          <div className="logo" style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img 
              src={logo} 
              alt="EC Logo" 
              style={{ width: '45px', height: '45px', borderRadius: '8px' }} 
            />
            <span style={{ fontWeight: '700', fontSize: '20px' }}>Education City</span>
          </div>
          <p style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '14px', lineHeight: '1.8' }}>
            Pakistan's premier technology learning center. From basic computing to Artificial Intelligence, we prepare the next generation for global tech excellence.
          </p>
        </div>
        
        <div className="footer-links">
          <h4 style={{ marginBottom: '24px', fontSize: '16px', color: 'var(--gold)' }}>Our Tracks</h4>
          <ul style={{ listStyle: 'none', display: 'grid', gap: '12px', fontSize: '14px', color: 'rgba(255, 255, 255, 0.6)' }}>
            <li>Weekend Beginner Track</li>
            <li>Full-stack Web Development</li>
            <li>Python for AI & ML</li>
            <li>Ethical Hacking</li>
          </ul>
        </div>
        
        <div className="footer-contact">
          <h4 style={{ marginBottom: '24px', fontSize: '16px', color: 'var(--gold)' }}>Connect With Us</h4>
          <ul style={{ listStyle: 'none', display: 'grid', gap: '16px', fontSize: '14px' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'rgba(255, 255, 255, 0.7)' }}>
              <span style={{ fontSize: '18px' }}>📍</span>
              Mir Pado, Tando Jam, Pakistan
            </li>
            <li>
              <a 
                href="https://wa.me/923126741558" 
                target="_blank" 
                rel="noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--teal-light)', textDecoration: 'none', fontWeight: '600' }}
              >
                <span style={{ fontSize: '18px' }}>💬</span>
                WhatsApp: 0312-6741558
              </a>
            </li>
            <li>
              <a 
                href="mailto:ethenhuntstark@gmail.com" 
                style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none' }}
              >
                <span style={{ fontSize: '18px' }}>✉️</span>
                ethenhuntstark@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>
      
      <div style={{
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        paddingTop: '32px',
        textAlign: 'center',
        fontSize: '12px',
        color: 'rgba(255, 255, 255, 0.4)'
      }}>
        © 2026 Education City & AI Academy · Building Tomorrow's Leaders · ایجوکیشن سٹی اکیڈمی
      </div>
    </footer>
  );
}

export default Footer;
