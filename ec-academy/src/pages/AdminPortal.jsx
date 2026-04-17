import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { academyService, supabase } from '../services/api';
import logo from '../assets/logo.jpg';

const StatCard = ({ label, val, icon }) => (
  <div style={{ background: '#fff', padding: '20px', borderRadius: '20px', border: '1px solid var(--border)', textAlign: 'center' }}>
    <div style={{ fontSize: '24px', marginBottom: '10px' }}>{icon}</div>
    <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--navy)' }}>{val}</div>
    <div style={{ fontSize: '10px', color: 'var(--muted)', fontWeight: '700' }}>{label}</div>
  </div>
);

const ManageRegistrations = () => {
  const [list, setList] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const fetch = async () => {
    const { data } = await supabase.from('registrations').select('*').order('created_at', { ascending: false });
    setList(data || []);
  };

  useEffect(() => { fetch(); }, []);

  const updateStatus = async (id, status) => {
    const { error } = await supabase.from('registrations').update({ status }).eq('id', id);
    if (error) alert("Error: " + error.message); else fetch();
  };

  const handleUpdateStudent = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('registrations').update(selectedStudent).eq('id', selectedStudent.id);
    if (error) {
      alert("Update Failed: " + error.message);
    } else {
      alert("Student Information Updated Successfully!");
      setIsEditing(false);
      setSelectedStudent(null);
      fetch();
    }
  };

  const downloadCSV = () => {
    if (list.length === 0) return;
    const headers = ["Name", "Father", "Course", "Fee Plan", "Status"];
    const rows = list.map(r => [r.student_name, r.father_name, r.course, r.fee_plan, r.status]);
    let csv = "data:text/csv;charset=utf-8," + [headers, ...rows].map(e => e.join(",")).join("\n");
    const link = document.createElement("a");
    link.href = encodeURI(csv);
    link.download = `EC_Academy_List.csv`;
    link.click();
  };

  return (
    <div className="fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '10px' }}>
        <h3 style={{ color: 'var(--navy)' }}>Student Management</h3>
        <button onClick={downloadCSV} className="btn btn-outline" style={{ fontSize: '12px' }}>📥 Export to Excel</button>
      </div>

      <div style={{ background: '#fff', padding: '20px', borderRadius: '24px', border: '1px solid var(--border)', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', minWidth: '600px' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--border)', color: 'var(--muted)' }}>
              <th style={{ padding: '12px' }}>Student Details</th>
              <th style={{ padding: '12px' }}>Course & Fee</th>
              <th style={{ padding: '12px' }}>Status</th>
              <th style={{ padding: '12px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.map(reg => (
              <tr key={reg.id} style={{ borderBottom: '1px solid #f8f8f8' }}>
                <td style={{ padding: '12px' }}>
                  <div style={{ fontWeight: '700' }}>{reg.student_name}</div>
                  <div style={{ fontSize: '11px', color: 'var(--muted)' }}>Father: {reg.father_name}</div>
                </td>
                <td style={{ padding: '12px' }}>
                  <div style={{ fontWeight: '600' }}>{reg.course}</div>
                  <div style={{ fontSize: '11px', color: 'var(--teal)' }}>Plan: {reg.fee_plan}</div>
                </td>
                <td style={{ padding: '12px' }}>
                  <span style={{ padding: '4px 8px', borderRadius: '20px', fontSize: '10px', fontWeight: '900', textTransform: 'uppercase', background: reg.status === 'approved' ? '#dcfce7' : reg.status === 'rejected' ? '#fee2e2' : '#fef9c3', color: reg.status === 'approved' ? '#15803d' : reg.status === 'rejected' ? '#b91c1c' : '#854d0e' }}>{reg.status}</span>
                </td>
                <td style={{ padding: '12px', display: 'flex', gap: '8px' }}>
                  <button onClick={() => { setSelectedStudent(reg); setIsEditing(false); }} style={{ color: 'var(--navy)', fontWeight: '800' }}>View</button>
                  <button onClick={() => { setSelectedStudent(reg); setIsEditing(true); }} style={{ color: 'var(--teal)', fontWeight: '800' }}>Edit</button>
                  <button onClick={() => updateStatus(reg.id, 'approved')} style={{ color: '#16a34a', fontWeight: '800' }}>Approve</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View/Edit Modal */}
      {selectedStudent && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.8)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div className="fade-in" style={{ background: '#fff', width: '100%', maxWidth: '500px', borderRadius: '24px', padding: '30px', position: 'relative', maxHeight: '90vh', overflowY: 'auto' }}>
            <button onClick={() => setSelectedStudent(null)} style={{ position: 'absolute', top: '20px', right: '20px', fontSize: '20px' }}>✕</button>
            <h3 style={{ marginBottom: '20px' }}>{isEditing ? 'Edit Student Record' : 'Student Enrollment Form'}</h3>
            
            {isEditing ? (
              <form onSubmit={handleUpdateStudent} style={{ display: 'grid', gap: '15px' }}>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: '800', display: 'block' }}>Student Name</label>
                  <input value={selectedStudent.student_name} onChange={e => setSelectedStudent({...selectedStudent, student_name: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)' }} />
                </div>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: '800', display: 'block' }}>Father Name</label>
                  <input value={selectedStudent.father_name} onChange={e => setSelectedStudent({...selectedStudent, father_name: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)' }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <label style={{ fontSize: '11px', fontWeight: '800', display: 'block' }}>Fee Plan</label>
                    <select value={selectedStudent.fee_plan} onChange={e => setSelectedStudent({...selectedStudent, fee_plan: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                      <option>Monthly</option>
                      <option>Full Course</option>
                      <option>Scholarship</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '11px', fontWeight: '800', display: 'block' }}>Total Fee</label>
                    <input type="number" value={selectedStudent.total_fee} onChange={e => setSelectedStudent({...selectedStudent, total_fee: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)' }} />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>Save Changes ✓</button>
              </form>
            ) : (
              <div style={{ display: 'grid', gap: '12px', fontSize: '14px' }}>
                <div><strong style={{ color: 'var(--muted)' }}>Name:</strong> {selectedStudent.student_name}</div>
                <div><strong style={{ color: 'var(--muted)' }}>Father:</strong> {selectedStudent.father_name}</div>
                <div><strong style={{ color: 'var(--muted)' }}>Course:</strong> {selectedStudent.course}</div>
                <div><strong style={{ color: 'var(--muted)' }}>Fee Plan:</strong> {selectedStudent.fee_plan}</div>
                <div><strong style={{ color: 'var(--muted)' }}>Total Fee:</strong> PKR {selectedStudent.total_fee}</div>
                <button onClick={() => window.print()} className="btn btn-outline" style={{ width: '100%', marginTop: '20px' }}>Print Form 🖨️</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// ... (Rest of the Hub components)
const ManageAnnouncements = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ title: '', content: '', tag: 'Update' });
  const fetch = async () => { const { data } = await academyService.getAnnouncements(); setItems(data || []); };
  useEffect(() => { fetch(); }, []);
  const handleSave = async (e) => { e.preventDefault(); await supabase.from('announcements').insert([form]); setForm({ title: '', content: '', tag: 'Update' }); fetch(); };
  return (
    <div>
      <h3>Announcements</h3>
      <form onSubmit={handleSave} style={{ background: '#fff', padding: '15px', borderRadius: '15px', border: '1px solid var(--border)', marginBottom: '20px' }}>
        <input placeholder="Title" value={form.title} onChange={e => setForm({...form, title: e.target.value})} style={{ width: '100%', padding: '10px', marginBottom: '10px' }} />
        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Post</button>
      </form>
      {items.map(item => ( <div key={item.id} style={{ padding: '10px', background: '#fff', borderBottom: '1px solid #eee' }}>{item.title}</div> ))}
    </div>
  );
};

const ManageCourses = () => {
  const [courses, setCourses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [courseForm, setCourseForm] = useState({ name: '', track: 'Beginner', program_type: 'Weekday', status: 'Active' });
  
  const fetch = async () => { const res = await academyService.getCourses(); setCourses(res.data || []); };
  useEffect(() => { fetch(); }, []);
  
  const handleSubmit = async (e) => { 
    e.preventDefault(); 
    await academyService.addCourse(courseForm); 
    setCourseForm({ name: '', track: 'Beginner', program_type: 'Weekday', status: 'Active' });
    setShowForm(false); 
    fetch(); 
  };
  
  const handleDelete = async (id) => { 
    if (window.confirm("Are you sure you want to delete this course?")) { 
      await academyService.deleteCourse(id); 
      fetch(); 
    } 
  };

  return (
    <div className="fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h3>Courses Database</h3>
        <button onClick={() => setShowForm(!showForm)} className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '12px' }}>
          {showForm ? 'Cancel' : '+ Add Course'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} style={{ background: '#fff', padding: '20px', borderRadius: '15px', border: '1px solid var(--border)', marginBottom: '20px', display: 'grid', gap: '10px' }}>
          <div>
            <label style={{ fontSize: '12px', fontWeight: '800' }}>Course Name</label>
            <input placeholder="e.g. Python Basics" value={courseForm.name} onChange={e => setCourseForm({...courseForm, name: e.target.value})} required style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)' }} />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>Save Course</button>
        </form>
      )}

      <div style={{ display: 'grid', gap: '10px' }}>
        {courses.map(c => (
          <div key={c.id} style={{ background: '#fff', padding: '15px', borderRadius: '12px', border: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontWeight: '700', color: 'var(--navy)' }}>{c.name}</div>
            <button onClick={() => handleDelete(c.id)} style={{ color: 'var(--red)', fontWeight: '800', fontSize: '12px', padding: '5px 10px', background: '#fee2e2', borderRadius: '8px' }}>Delete</button>
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
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '15px' }}>
      <StatCard label="Students" val={stats.students} icon="👥" />
      <StatCard label="Pending" val={stats.apps} icon="📋" />
      <StatCard label="Courses" val={stats.courses} icon="📚" />
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
        <h3 style={{ marginBottom: '30px', padding: '0 10px' }}>Admin Hub</h3>
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
        .nav-link-side { color: rgba(255,255,255,0.6); padding: 12px 15px; text-decoration: none; border-radius: 10px; font-size: 14px; }
        .nav-link-side:hover { background: rgba(255,255,255,0.05); color: #fff; }
      `}</style>
    </div>
  );
}

export default AdminPortal;
