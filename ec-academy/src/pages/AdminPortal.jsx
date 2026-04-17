import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { academyService } from '../services/api';
import logo from '../assets/logo.jpg';

const StatCard = ({ label, val, icon, delta }) => (
  <div className="fade-in" style={{
    background: '#fff',
    padding: '24px',
    borderRadius: '20px',
    border: '1px solid var(--border)',
    boxShadow: '0 4px 20px rgba(0,0,0,0.02)'
  }}>
    <div style={{ fontSize: '24px', marginBottom: '12px' }}>{icon}</div>
    <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--navy)', marginBottom: '4px' }}>{val}</div>
    <div style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</div>
    {delta && <div style={{ fontSize: '10px', color: '#16a34a', marginTop: '8px', fontWeight: '700' }}>{delta}</div>}
  </div>
);

const ManageCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [courseForm, setCourseForm] = useState({
    name: '',
    track: 'Beginner',
    program_type: 'Weekday',
    trainer: '',
    duration: '',
    topics: '',
    status: 'Active'
  });

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const res = await academyService.getCourses();
      setCourses(res.data || []);
    } catch (err) {
      console.error("Failed to fetch courses:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = editingId ? { ...courseForm, id: editingId } : courseForm;
      await academyService.addCourse(payload);
      setShowForm(false);
      setEditingId(null);
      setCourseForm({ name: '', track: 'Beginner', program_type: 'Weekday', trainer: '', duration: '', topics: '', status: 'Active' });
      fetchCourses();
      alert(editingId ? "Course updated!" : "Course added!");
    } catch (err) {
      console.error("Failed to save course:", err);
      alert("Error saving course.");
    }
  };

  const handleEdit = (course) => {
    setCourseForm({
      name: course.name,
      track: course.track,
      program_type: course.program_type || 'Weekday',
      trainer: course.trainer || '',
      duration: course.duration || '',
      topics: course.topics || '',
      status: course.status || 'Active'
    });
    setEditingId(course.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await academyService.deleteCourse(id);
      fetchCourses();
    } catch (err) {
      alert("Error deleting course.");
    }
  };

  return (
    <div className="fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h3>Course Management</h3>
        <button 
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
            setCourseForm({ name: '', track: 'Beginner', program_type: 'Weekday', trainer: '', duration: '', topics: '', status: 'Active' });
          }}
          className="btn btn-primary"
        >
          {showForm ? 'Cancel' : '+ New Course'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="glass" style={{ background: '#fff', padding: '30px', borderRadius: '24px', marginBottom: '40px', border: '1px solid var(--border)' }}>
          <h4 style={{ marginBottom: '20px' }}>{editingId ? 'Edit Course' : 'Add New Course'}</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            <div>
              <label style={{ fontSize: '12px', color: 'var(--muted)', display: 'block', marginBottom: '8px' }}>Course Name</label>
              <input required value={courseForm.name} onChange={(e) => setCourseForm({...courseForm, name: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)' }} />
            </div>
            <div>
              <label style={{ fontSize: '12px', color: 'var(--muted)', display: 'block', marginBottom: '8px' }}>Program Type</label>
              <select value={courseForm.program_type} onChange={(e) => setCourseForm({...courseForm, program_type: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                <option>Weekday</option>
                <option>Weekend</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: '12px', color: 'var(--muted)', display: 'block', marginBottom: '8px' }}>Level / Track</label>
              <select value={courseForm.track} onChange={(e) => setCourseForm({...courseForm, track: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: '12px', color: 'var(--muted)', display: 'block', marginBottom: '8px' }}>Instructor</label>
              <input value={courseForm.trainer} onChange={(e) => setCourseForm({...courseForm, trainer: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)' }} />
            </div>
            <div>
              <label style={{ fontSize: '12px', color: 'var(--muted)', display: 'block', marginBottom: '8px' }}>Duration / Schedule</label>
              <input value={courseForm.duration} onChange={(e) => setCourseForm({...courseForm, duration: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)' }} placeholder="e.g. 6 Months" />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ fontSize: '12px', color: 'var(--muted)', display: 'block', marginBottom: '8px' }}>Topics (Comma separated)</label>
              <textarea value={courseForm.topics} onChange={(e) => setCourseForm({...courseForm, topics: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)', minHeight: '80px' }} placeholder="Topic 1, Topic 2, Topic 3..." />
            </div>
          </div>
          <button type="submit" className="btn btn-primary" style={{ marginTop: '24px' }}>{editingId ? 'Update Course' : 'Save Course'}</button>
        </form>
      )}

      <div className="glass" style={{ background: '#fff', padding: 'min(30px, 5vw)', borderRadius: '24px', border: '1px solid var(--border)', overflowX: 'auto' }}>
        {loading ? <p>Loading...</p> : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', minWidth: '700px' }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--border)', color: 'var(--muted)' }}>
                <th style={{ padding: '12px' }}>Program</th>
                <th style={{ padding: '12px' }}>Course Name</th>
                <th style={{ padding: '12px' }}>Trainer</th>
                <th style={{ padding: '12px' }}>Status</th>
                <th style={{ padding: '12px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((c) => (
                <tr key={c.id} style={{ borderBottom: '1px solid #f8f8f8' }}>
                  <td style={{ padding: '16px 12px' }}>
                    <span style={{ fontSize: '10px', background: c.program_type === 'Weekend' ? '#fef2f2' : '#f0fdf4', color: c.program_type === 'Weekend' ? '#991b1b' : '#166534', padding: '4px 8px', borderRadius: '6px', fontWeight: '800', textTransform: 'uppercase' }}>{c.program_type}</span>
                  </td>
                  <td style={{ padding: '16px 12px', fontWeight: '600' }}>{c.name}</td>
                  <td style={{ padding: '16px 12px' }}>{c.trainer}</td>
                  <td style={{ padding: '16px 12px' }}>
                     <span style={{ color: '#16a34a', fontWeight: '700' }}>{c.status}</span>
                  </td>
                  <td style={{ padding: '16px 12px', display: 'flex', gap: '12px' }}>
                    <button onClick={() => handleEdit(c)} style={{ color: 'var(--teal)', fontWeight: '700', fontSize: '12px' }}>Edit</button>
                    <button onClick={() => handleDelete(c.id)} style={{ color: 'var(--red)', fontWeight: '700', fontSize: '12px' }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

const AdminDashboard = () => (
  <div className="fade-in">
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(150px, 45%, 220px), 1fr))', gap: '20px', marginBottom: '40px' }}>
      <StatCard label="Total Students" val="320" icon="👥" delta="+12 this month" />
      <StatCard label="Pending Apps" val="14" icon="📋" />
      <StatCard label="Active Courses" val="9" icon="📚" />
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 500px), 1fr))', gap: '30px' }}>
      <div className="glass" style={{ background: '#fff', padding: 'min(30px, 5vw)', borderRadius: '24px', border: '1px solid var(--border)', overflowX: 'auto' }}>
        <h3 style={{ marginBottom: '24px' }}>Recent Applications</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', minWidth: '400px' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--border)', color: 'var(--muted)' }}>
              <th style={{ padding: '12px 10px' }}>Name</th>
              <th style={{ padding: '12px 10px' }}>Course</th>
              <th style={{ padding: '12px 10px' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {[
              { name: 'Usman Tariq', course: 'Python AI', status: 'Pending' },
              { name: 'Hina Malik', course: 'Web Dev', status: 'Approved' }
            ].map((app, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #f8f8f8' }}>
                <td style={{ padding: '16px 10px', fontWeight: '600' }}>{app.name}</td>
                <td style={{ padding: '16px 10px' }}>{app.course}</td>
                <td style={{ padding: '16px 10px' }}>
                  <span style={{
                    padding: '4px 10px',
                    borderRadius: '20px',
                    fontSize: '11px',
                    fontWeight: '700',
                    background: app.status === 'Approved' ? '#dcfce7' : '#fef9c3',
                    color: app.status === 'Approved' ? '#15803d' : '#854d0e'
                  }}>{app.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

function AdminPortal() {
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
          background: '#ff6b35',
          color: '#fff',
          zIndex: 1001,
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          display: 'none',
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
              alt="Admin Logo" 
              style={{ width: '40px', height: '40px', borderRadius: '8px' }} 
            />
            <h3 style={{ color: '#fff', fontSize: '1.2rem' }}>Admin Hub</h3>
          </div>
        </div>
        
        <nav style={{ display: 'grid', gap: '10px' }}>
          {[
            { label: 'Overview', icon: '📊', path: '' },
            { label: 'Students', icon: '👥', path: 'students' },
            { label: 'Applications', icon: '📋', path: 'registrations' },
            { label: 'Courses', icon: '📚', path: 'courses' },
            { label: 'Announcements', icon: '📢', path: 'announce' },
            { label: 'Settings', icon: '⚙️', path: 'settings' }
          ].map((item, i) => {
            const fullPath = `/admin/${item.path}`;
            const isActive = location.pathname === fullPath || (item.path === '' && location.pathname === '/admin');
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
                <span style={{ fontSize: '18px' }}>{item.icon}</span>
                {item.label}
              </Link>
            )
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main style={{ marginLeft: 'var(--sidebar-width)', flex: 1, padding: 'clamp(20px, 5vw, 60px)', width: '100%' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '50px', flexWrap: 'wrap', gap: '20px' }}>
          <div>
             <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', color: 'var(--navy)', fontWeight: '800' }}>Admin Control</h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '48px', height: '48px', background: 'linear-gradient(135deg, var(--gold), #ff6b35)', borderRadius: '14px', color: 'var(--navy)', fontWeight: '900', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>AD</div>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/students" element={<div className="fade-in"><h3>Students Management</h3></div>} />
          <Route path="/registrations" element={<div><h3>New Applications</h3></div>} />
          <Route path="/courses" element={<ManageCourses />} />
          <Route path="/announce" element={<div><h3>Announcements</h3></div>} />
          <Route path="/settings" element={<div><h3>Settings</h3></div>} />
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

export default AdminPortal;
