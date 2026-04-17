import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { academyService, supabase } from '../services/api';
import logo from '../assets/logo.jpg';

const StatCard = ({ label, val, icon }) => (
  <div className="fade-in" style={{
    background: '#fff',
    padding: '20px',
    borderRadius: '20px',
    border: '1px solid var(--border)',
    boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
    textAlign: 'center'
  }}>
    <div style={{ fontSize: '24px', marginBottom: '10px' }}>{icon}</div>
    <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--navy)', marginBottom: '4px' }}>{val}</div>
    <div style={{ fontSize: '10px', color: 'var(--muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>{label}</div>
  </div>
);

// --- Component: Manage Registrations (with Download & Detail Fix) ---
const ManageRegistrations = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const fetch = async () => {
    setLoading(true);
    const { data } = await supabase.from('registrations').select('*').order('created_at', { ascending: false });
    setList(data || []);
    setLoading(false);
  };

  useEffect(() => { fetch(); }, []);

  const updateStatus = async (id, status) => {
    const { error } = await supabase.from('registrations').update({ status }).eq('id', id);
    if (error) {
      alert("Error: " + error.message);
    } else {
      fetch();
    }
  };

  // CSV Download Logic
  const downloadCSV = () => {
    if (list.length === 0) return;
    const headers = ["Name", "Father Name", "Gender", "Caste", "Course", "Track", "Username", "Status", "Date"];
    const rows = list.map(r => [
      r.student_name, r.father_name, r.gender, r.caste, r.course, r.program_type, r.username, r.status, r.created_at
    ]);
    
    let csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `EC_Academy_Students_${new Date().toLocaleDateString()}.csv`);
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h3>Student Applications</h3>
        <button onClick={downloadCSV} className="btn btn-outline" style={{ fontSize: '12px', padding: '8px 16px' }}>📥 Download Excel (CSV)</button>
      </div>

      <div className="glass" style={{ background: '#fff', padding: '20px', borderRadius: '24px', border: '1px solid var(--border)', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', minWidth: '600px' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--border)', color: 'var(--muted)' }}>
              <th style={{ padding: '12px' }}>Student</th>
              <th style={{ padding: '12px' }}>Course</th>
              <th style={{ padding: '12px' }}>Status</th>
              <th style={{ padding: '12px' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {list.map(reg => (
              <tr key={reg.id} style={{ borderBottom: '1px solid #f8f8f8' }}>
                <td style={{ padding: '12px' }}>
                  <div style={{ fontWeight: '700' }}>{reg.student_name}</div>
                  <div style={{ fontSize: '11px', color: 'var(--muted)' }}>{reg.username}</div>
                </td>
                <td style={{ padding: '12px' }}>{reg.course}</td>
                <td style={{ padding: '12px' }}>
                  <span style={{ padding: '4px 8px', borderRadius: '20px', fontSize: '10px', fontWeight: '900', textTransform: 'uppercase', background: reg.status === 'approved' ? '#dcfce7' : reg.status === 'rejected' ? '#fee2e2' : '#fef9c3', color: reg.status === 'approved' ? '#15803d' : reg.status === 'rejected' ? '#b91c1c' : '#854d0e' }}>{reg.status}</span>
                </td>
                <td style={{ padding: '12px', display: 'flex', gap: '8px' }}>
                  <button onClick={() => setSelectedStudent(reg)} style={{ color: 'var(--navy)', fontWeight: '800' }}>View</button>
                  <button onClick={() => updateStatus(reg.id, 'approved')} style={{ color: 'var(--teal)', fontWeight: '800' }}>Approve</button>
                  <button onClick={() => updateStatus(reg.id, 'rejected')} style={{ color: 'var(--red)', fontWeight: '800' }}>Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Student Detail Modal */}
      {selectedStudent && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.8)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div className="fade-in" style={{ background: '#fff', width: '100%', maxWidth: '500px', borderRadius: '24px', padding: '30px', position: 'relative' }}>
            <button onClick={() => setSelectedStudent(null)} style={{ position: 'absolute', top: '20px', right: '20px', fontSize: '20px' }}>✕</button>
            <h3 style={{ marginBottom: '20px' }}>Enrollment Form</h3>
            <div style={{ display: 'grid', gap: '12px', fontSize: '14px' }}>
              <div><strong style={{ color: 'var(--muted)' }}>Full Name:</strong> {selectedStudent.student_name}</div>
              <div><strong style={{ color: 'var(--muted)' }}>Father Name:</strong> {selectedStudent.father_name}</div>
              <div><strong style={{ color: 'var(--muted)' }}>Gender:</strong> {selectedStudent.gender}</div>
              <div><strong style={{ color: 'var(--muted)' }}>Caste:</strong> {selectedStudent.caste || 'N/A'}</div>
              <div><strong style={{ color: 'var(--muted)' }}>Course:</strong> {selectedStudent.course}</div>
              <div><strong style={{ color: 'var(--muted)' }}>Track:</strong> {selectedStudent.program_type}</div>
              <div><strong style={{ color: 'var(--muted)' }}>Username:</strong> {selectedStudent.username}</div>
              <div><strong style={{ color: 'var(--muted)' }}>Applied On:</strong> {new Date(selectedStudent.created_at).toLocaleString()}</div>
            </div>
            <button onClick={() => window.print()} className="btn btn-primary" style={{ width: '100%', marginTop: '30px' }}>Print Form 🖨️</button>
          </div>
        </div>
      )}
    </div>
  );
};

// (Rest of the Admin Hub components maintained for brevity...)
const ManageAnnouncements = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ title: '', content: '', tag: 'Update' });
  const fetch = async () => { const { data } = await academyService.getAnnouncements(); setItems(data || []); };
  useEffect(() => { fetch(); }, []);
  const handleSave = async (e) => {
    e.preventDefault();
    await supabase.from('announcements').insert([form]);
    setForm({ title: '', content: '', tag: 'Update' }); fetch();
  };
  const handleDelete = async (id) => { await supabase.from('announcements').delete().eq('id', id); fetch(); };
  return (
    <div className="fade-in">
      <h3>Announcements</h3>
      <form onSubmit={handleSave} style={{ background: '#fff', padding: '20px', borderRadius: '15px', border: '1px solid var(--border)', marginBottom: '30px' }}>
        <input placeholder="Title" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '8px', border: '1px solid var(--border)' }} />
        <textarea placeholder="Message..." value={form.content} onChange={e => setForm({...form, content: e.target.value})} style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '8px', border: '1px solid var(--border)', minHeight: '60px' }} />
        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Post Announcement</button>
      </form>
      <div style={{ display: 'grid', gap: '10px' }}>
        {items.map(item => (
          <div key={item.id} style={{ background: '#fff', padding: '15px', borderRadius: '12px', border: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '14px', fontWeight: '600' }}>{item.title}</div>
            <button onClick={() => handleDelete(item.id)} style={{ color: 'var(--red)', fontSize: '11px', fontWeight: '800' }}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

const ManageCourses = () => {
  const [courses, setCourses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [courseForm, setCourseForm] = useState({ name: '', track: 'Beginner', program_type: 'Weekday', status: 'Active' });
  const fetch = async () => { const res = await academyService.getCourses(); setCourses(res.data || []); };
  useEffect(() => { fetch(); }, []);
  const handleSubmit = async (e) => { e.preventDefault(); await academyService.addCourse(courseForm); setShowForm(false); fetch(); };
  const handleDelete = async (id) => { if (window.confirm("Delete?")) { await academyService.deleteCourse(id); fetch(); } };
  return (
    <div className="fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h3>Courses</h3>
        <button onClick={() => setShowForm(!showForm)} className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '12px' }}>+ New</button>
      </div>
      {showForm && (
        <form onSubmit={handleSubmit} style={{ background: '#fff', padding: '20px', borderRadius: '15px', border: '1px solid var(--border)', marginBottom: '20px' }}>
          <input placeholder="Name" value={courseForm.name} onChange={e => setCourseForm({...courseForm, name: e.target.value})} required style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '8px', border: '1px solid var(--border)' }} />
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Save Course</button>
        </form>
      )}
      <div style={{ display: 'grid', gap: '10px' }}>
        {courses.map(c => (
          <div key={c.id} style={{ background: '#fff', padding: '15px', borderRadius: '12px', border: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ fontWeight: '700' }}>{c.name}</div>
            <button onClick={() => handleDelete(c.id)} style={{ color: 'var(--red)', fontWeight: '800' }}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const [stats, setStats] = useState({ students: 0, apps: 0, courses: 0 });
  useEffect(() => {
    const fetchStats = async () => {
      const { count: sCount } = await supabase.from('registrations').select('*', { count: 'exact', head: true });
      const { count: aCount } = await supabase.from('registrations').select('*', { count: 'exact', head: true }).eq('status', 'pending');
      const { count: cCount } = await supabase.from('courses').select('*', { count: 'exact', head: true });
      setStats({ students: sCount || 0, apps: aCount || 0, courses: cCount || 0 });
    };
    fetchStats();
  }, []);
  return (
    <div className="fade-in">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '15px', marginBottom: '30px' }}>
        <StatCard label="Students" val={stats.students} icon="👥" />
        <StatCard label="Pending" val={stats.apps} icon="📋" />
        <StatCard label="Courses" val={stats.courses} icon="📚" />
      </div>
    </div>
  );
};

function AdminPortal() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="portal-layout" style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)' }}>
      {sidebarOpen && <div onClick={() => setSidebarOpen(false)} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', zIndex: 998 }}></div>}
      <aside style={{ width: '260px', background: 'var(--navy)', color: '#fff', padding: '30px 15px', position: 'fixed', height: '100vh', zIndex: 999, left: 0, transition: 'transform 0.3s ease', transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)' }} className="admin-sidebar">
        <div style={{ marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '10px', padding: '0 10px' }}>
          <img src={logo} alt="Logo" style={{ width: '35px', borderRadius: '8px' }} />
          <h3 style={{ fontSize: '1rem' }}>Admin Hub</h3>
        </div>
        <nav style={{ display: 'grid', gap: '8px' }}>
          <Link to="/admin" className="nav-link-side" onClick={() => setSidebarOpen(false)}>📊 Overview</Link>
          <Link to="/admin/registrations" className="nav-link-side" onClick={() => setSidebarOpen(false)}>📋 Applications</Link>
          <Link to="/admin/courses" className="nav-link-side" onClick={() => setSidebarOpen(false)}>📚 Courses</Link>
          <Link to="/admin/announce" className="nav-link-side" onClick={() => setSidebarOpen(false)}>📢 Announcements</Link>
        </nav>
      </aside>
      <div className="mobile-admin-bar" style={{ display: 'none', position: 'fixed', top: '65px', width: '100%', background: 'var(--navy)', color: '#fff', padding: '10px 20px', zIndex: 900, justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontWeight: '800' }}>Admin Dashboard</div>
        <button onClick={() => setSidebarOpen(true)} style={{ color: '#fff' }}>☰ Menu</button>
      </div>
      <main className="admin-main" style={{ marginLeft: '260px', flex: 1, padding: '40px 30px' }}>
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/registrations" element={<ManageRegistrations />} />
          <Route path="/courses" element={<ManageCourses />} />
          <Route path="/announce" element={<ManageAnnouncements />} />
        </Routes>
      </main>
      <style>{`
        @media (min-width: 1025px) { .admin-sidebar { transform: translateX(0) !important; } }
        @media (max-width: 1024px) { .admin-main { margin-left: 0 !important; padding-top: 100px !important; } .mobile-admin-bar { display: flex !important; } }
        .nav-link-side { color: rgba(255,255,255,0.6); padding: 12px 15px; text-decoration: none; border-radius: 10px; font-size: 14px; display: flex; align-items: center; gap: 10px; }
        .nav-link-side:hover { background: rgba(255,255,255,0.05); color: #fff; }
      `}</style>
    </div>
  );
}

export default AdminPortal;
