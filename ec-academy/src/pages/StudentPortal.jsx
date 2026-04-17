import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import logo from '../assets/logo.jpg';

const CourseProgressCard = ({ title, progress, instructor, grade, status }) => (
  <div className="fade-in" style={{
    background: '#fff',
    padding: '24px',
    borderRadius: '24px',
    border: '1px solid var(--border)',
    boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
    marginBottom: '20px'
  }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
      <div>
        <h4 style={{ fontSize: '1.1rem', color: 'var(--navy)', marginBottom: '4px' }}>{title}</h4>
        <p style={{ fontSize: '12px', color: 'var(--muted)' }}>Instructor: {instructor}</p>
      </div>
      <span style={{
        padding: '5px 12px',
        borderRadius: '20px',
        fontSize: '11px',
        fontWeight: '700',
        background: status === 'Active' ? '#dcfce7' : '#f1f1f1',
        color: status === 'Active' ? '#15803d' : '#666'
      }}>{status}</span>
    </div>
    
    <div style={{ marginBottom: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '8px' }}>
        <span style={{ fontWeight: '600' }}>Progress</span>
        <span style={{ fontWeight: '700', color: 'var(--teal)' }}>{progress}%</span>
      </div>
      <div style={{ background: '#f0f0f0', height: '8px', borderRadius: '10px', overflow: 'hidden' }}>
        <div style={{ background: 'linear-gradient(90deg, var(--teal), var(--teal-light))', width: `${progress}%`, height: '100%', borderRadius: '10px' }}></div>
      </div>
    </div>

    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid #f8f8f8' }}>
      <div style={{ fontSize: '13px' }}>Grade: <span style={{ fontWeight: '800', color: 'var(--gold)' }}>{grade}</span></div>
      <button style={{ color: 'var(--teal)', fontSize: '13px', fontWeight: '700' }}>View →</button>
    </div>
  </div>
);

const StudentDashboard = () => (
  <div className="fade-in">
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(150px, 45%, 200px), 1fr))', gap: '20px', marginBottom: '40px' }}>
      <div style={{ background: 'var(--navy)', padding: '24px', borderRadius: '24px', color: '#fff' }}>
        <div style={{ fontSize: '24px', marginBottom: '12px' }}>📚</div>
        <div style={{ fontSize: '1.8rem', fontWeight: '800' }}>2</div>
        <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: '1px' }}>Courses</div>
      </div>
      <div style={{ background: '#fff', padding: '24px', borderRadius: '24px', border: '1px solid var(--border)' }}>
        <div style={{ fontSize: '24px', marginBottom: '12px' }}>✅</div>
        <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--navy)' }}>88%</div>
        <div style={{ fontSize: '11px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Attendance</div>
      </div>
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))', gap: '30px' }}>
      <div>
        <h3 style={{ marginBottom: '24px', fontSize: '1.4rem' }}>My Tracks</h3>
        <CourseProgressCard title="Python AI" progress={72} instructor="Sir Kamran" grade="A-" status="Active" />
      </div>

      <div>
        <div className="glass" style={{ background: '#fff', padding: '30px', borderRadius: '24px', border: '1px solid var(--border)' }}>
          <h3 style={{ marginBottom: '20px', fontSize: '1.2rem' }}>Next Class</h3>
          <div style={{ borderLeft: '4px solid var(--gold)', paddingLeft: '16px' }}>
             <div style={{ fontWeight: '700', color: 'var(--navy)' }}>Python AI Module 4</div>
             <div style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '4px' }}>Today • 02:00 PM</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

function StudentPortal() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="portal-layout" style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)', position: 'relative' }}>
      {/* Mobile Toggle Button */}
      <button 
        onClick={() => setSidebarOpen(!sidebarOpen)}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'var(--navy)',
          color: '#fff',
          zIndex: 1001,
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          display: 'none', // Managed by media query below
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px'
        }}
        className="sidebar-toggle"
      >
        {sidebarOpen ? '✕' : '☰'}
      </button>

      {/* Sidebar */}
      <aside 
        className={sidebarOpen ? 'sidebar-active' : ''}
        style={{
          width: 'var(--sidebar-width)',
          background: 'var(--navy)',
          color: '#fff',
          padding: '40px 16px',
          position: 'fixed',
          height: '100vh',
          zIndex: 1000,
          transition: 'transform 0.3s ease',
          boxShadow: '10px 0 30px rgba(0,0,0,0.1)'
        }}
      >
        <div style={{ marginBottom: '48px', padding: '0 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <img 
              src={logo} 
              alt="EC Logo" 
              style={{ width: '40px', height: '40px', borderRadius: '8px' }} 
            />
            <h3 style={{ color: '#fff', fontSize: '1.2rem' }}>Student Hub</h3>
          </div>
        </div>
        
        <nav style={{ display: 'grid', gap: '10px' }}>
          {[
            { label: 'Dashboard', icon: '🏠', path: '' },
            { label: 'Courses', icon: '📚', path: 'courses' },
            { label: 'Results', icon: '📊', path: 'results' },
            { label: 'Schedule', icon: '🗓️', path: 'schedule' },
            { label: 'Profile', icon: '👤', path: 'profile' }
          ].map((item, i) => {
            const fullPath = `/student/${item.path}`;
            const isActive = location.pathname === fullPath || (item.path === '' && location.pathname === '/student');
            return (
              <Link key={i} to={fullPath} onClick={() => setSidebarOpen(false)} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                padding: '14px 20px',
                borderRadius: '14px',
                fontSize: '14px',
                color: isActive ? 'var(--gold)' : 'rgba(255, 255, 255, 0.6)',
                background: isActive ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
                fontWeight: isActive ? '700' : '500'
              }}>
                <span>{item.icon}</span>
                {item.label}
              </Link>
            )
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main style={{ marginLeft: 'var(--sidebar-width)', flex: 1, padding: 'clamp(20px, 5vw, 60px)', width: '100%' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
          <div>
             <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.22rem)', color: 'var(--navy)', fontWeight: '800' }}>Student Portal</h2>
             <p style={{ color: 'var(--muted)', marginTop: '4px' }}>Welcome, Ahmad!</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '48px', height: '48px', background: 'linear-gradient(135deg, var(--gold), var(--teal))', borderRadius: '14px', color: 'var(--navy)', fontWeight: '900', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>AA</div>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<StudentDashboard />} />
          <Route path="/courses" element={<div className="fade-in"><h3>My Courses</h3></div>} />
          <Route path="/results" element={<div><h3>Results</h3></div>} />
          <Route path="/schedule" element={<div><h3>Schedule</h3></div>} />
          <Route path="/profile" element={<div><h3>Profile</h3></div>} />
        </Routes>
      </main>

      <style>{`
        @media (max-width: 1024px) {
          aside {
            transform: translateX(-100%);
          }
          .sidebar-toggle {
            display: flex !important;
          }
          main {
            margin-left: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}

export default StudentPortal;
