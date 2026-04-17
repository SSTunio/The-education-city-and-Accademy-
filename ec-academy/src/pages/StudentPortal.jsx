import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { supabase, academyService } from '../services/api';
import logo from '../assets/logo.jpg';

const CourseProgressCard = ({ title, instructor, status, program }) => (
  <div className="fade-in" style={{
    background: '#fff',
    padding: '24px',
    borderRadius: '24px',
    border: '1px solid var(--border)',
    boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
    marginBottom: '20px'
  }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
      <div>
        <h4 style={{ fontSize: '1.2rem', color: 'var(--navy)', marginBottom: '4px' }}>{title}</h4>
        <p style={{ fontSize: '13px', color: 'var(--muted)' }}>Track: {program}</p>
      </div>
      <span style={{
        padding: '5px 12px',
        borderRadius: '20px',
        fontSize: '11px',
        fontWeight: '800',
        textTransform: 'uppercase',
        background: status === 'approved' ? '#dcfce7' : '#fef9c3',
        color: status === 'approved' ? '#15803d' : '#854d0e'
      }}>{status === 'approved' ? 'Active Student' : 'Admission Pending'}</span>
    </div>
    
    <div style={{ paddingTop: '16px', borderTop: '1px solid #f8f8f8', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ fontSize: '13px', color: 'var(--navy)', fontWeight: '600' }}>
        {status === 'approved' ? '✅ Enrolled' : '⏳ Processing Application'}
      </div>
      <button style={{ color: 'var(--teal)', fontSize: '13px', fontWeight: '800' }}>Access LMS →</button>
    </div>
  </div>
);

const StudentDashboard = () => {
  const { user } = useApp();
  const [studentData, setStudentData] = useState(null);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortalData = async () => {
      setLoading(true);
      // 1. Fetch Student Info
      const { data: reg } = await supabase
        .from('registrations')
        .select('*')
        .eq('username', user?.username)
        .maybeSingle();
      
      setStudentData(reg);

      // 2. Fetch Live Announcements
      const { data: ann } = await academyService.getAnnouncements();
      setAnnouncements(ann || []);
      
      setLoading(false);
    };

    if (user?.username) fetchPortalData();
  }, [user]);

  if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>🔄 Syncing with Academy Database...</div>;

  return (
    <div className="fade-in">
      {/* Welcome Message */}
      <div className="glass" style={{ background: 'var(--navy)', padding: '30px', borderRadius: '24px', color: '#fff', marginBottom: '40px', position: 'relative', overflow: 'hidden' }}>
        <h2 style={{ fontSize: '1.8rem', position: 'relative', zIndex: 1 }}>Welcome back, {studentData?.student_name || user?.name}! 👋</h2>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>Your current application status is: <strong style={{ color: 'var(--gold)' }}>{studentData?.status?.toUpperCase() || 'PENDING'}</strong></p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 450px), 1fr))', gap: '30px' }}>
        {/* Enrolled Courses */}
        <div>
          <h3 style={{ marginBottom: '20px' }}>My Active Track</h3>
          {studentData ? (
            <CourseProgressCard 
              title={studentData.course} 
              program={studentData.program_type}
              status={studentData.status}
              instructor="Assigned on Start"
            />
          ) : (
            <p style={{ color: 'var(--muted)' }}>No active enrollments found.</p>
          )}
        </div>

        {/* Live Announcements */}
        <div>
          <h3 style={{ marginBottom: '20px' }}>Academy Updates</h3>
          <div className="glass" style={{ background: '#fff', padding: '24px', borderRadius: '24px', border: '1px solid var(--border)' }}>
            {announcements.length > 0 ? announcements.map(ann => (
              <div key={ann.id} style={{ marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid #f0f0f0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{ fontSize: '10px', background: 'var(--gold)', color: 'var(--navy)', padding: '2px 8px', borderRadius: '4px', fontWeight: '900' }}>{ann.tag}</span>
                  <strong style={{ fontSize: '14px' }}>{ann.title}</strong>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--muted)' }}>{ann.content}</p>
              </div>
            )) : <p style={{ fontSize: '13px', color: 'var(--muted)' }}>No current updates.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

function StudentPortal() {
  const { user } = useApp();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Initials for Avatar
  const getInitials = (name) => {
    if (!name) return 'ST';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="portal-layout" style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div onClick={() => setSidebarOpen(false)} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', zIndex: 998 }}></div>
      )}

      {/* Sidebar */}
      <aside style={{ 
        width: '260px', background: 'var(--navy)', color: '#fff', padding: '40px 16px', position: 'fixed', height: '100vh', zIndex: 999,
        left: 0, transition: 'transform 0.3s ease', transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)'
      }} className="student-sidebar">
        <div style={{ marginBottom: '48px', padding: '0 20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src={logo} alt="Logo" style={{ width: '35px', borderRadius: '8px' }} />
          <h3 style={{ fontSize: '1rem' }}>Student Hub</h3>
        </div>
        <nav style={{ display: 'grid', gap: '8px' }}>
          {[
            { label: 'Dashboard', icon: '🏠', path: '' },
            { label: 'Courses', icon: '📚', path: 'courses' },
            { label: 'Results', icon: '📊', path: 'results' },
            { label: 'Schedule', icon: '🗓️', path: 'schedule' }
          ].map((item, i) => {
            const path = `/student/${item.path}`;
            const isActive = location.pathname === path || (item.path === '' && location.pathname === '/student');
            return (
              <Link key={i} to={path} onClick={() => setSidebarOpen(false)} style={{ 
                color: isActive ? 'var(--gold)' : 'rgba(255,255,255,0.6)', 
                padding: '12px 20px', textDecoration: 'none', borderRadius: '12px', fontSize: '14px',
                background: isActive ? 'rgba(255,255,255,0.05)' : 'transparent', fontWeight: isActive ? '800' : '500',
                display: 'flex', alignItems: 'center', gap: '12px'
              }}>
                <span>{item.icon}</span> {item.label}
              </Link>
            )
          })}
        </nav>
      </aside>

      {/* Mobile Bar */}
      <div className="mobile-portal-bar" style={{ display: 'none', position: 'fixed', top: '65px', left: 0, width: '100%', background: 'var(--navy)', color: '#fff', padding: '12px 20px', zIndex: 900, justifyContent: 'space-between', alignItems: 'center' }}>
         <div style={{ fontSize: '14px', fontWeight: '800' }}>Student Portal</div>
         <button onClick={() => setSidebarOpen(true)} style={{ color: '#fff' }}>☰ Menu</button>
      </div>

      <main className="portal-main" style={{ marginLeft: '260px', flex: 1, padding: '40px clamp(20px, 5vw, 60px)' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ width: '45px', height: '45px', background: 'linear-gradient(135deg, var(--gold), var(--teal))', borderRadius: '12px', color: 'var(--navy)', fontWeight: '900', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {getInitials(user?.name)}
            </div>
            <div className="desktop-only">
              <div style={{ fontWeight: '800', color: 'var(--navy)' }}>{user?.name}</div>
              <div style={{ fontSize: '11px', color: 'var(--muted)' }}>Student ID: {user?.username}</div>
            </div>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<StudentDashboard />} />
          <Route path="/courses" element={<div className="fade-in"><h3>My Courses</h3><p>Course content loading from LMS...</p></div>} />
          <Route path="/results" element={<div><h3>Results</h3><p>Exam results will be posted here.</p></div>} />
          <Route path="/schedule" element={<div><h3>Class Schedule</h3><p>Your weekly timetable.</p></div>} />
        </Routes>
      </main>

      <style>{`
        @media (min-width: 1025px) { .student-sidebar { transform: translateX(0) !important; } }
        @media (max-width: 1024px) {
          .portal-main { margin-left: 0 !important; padding-top: 120px !important; }
          .mobile-portal-bar { display: flex !important; }
          .desktop-only { display: none !important; }
        }
      `}</style>
    </div>
  );
}

export default StudentPortal;
