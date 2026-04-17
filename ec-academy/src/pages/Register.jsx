import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService, academyService } from '../services/api';
import logo from '../assets/logo.jpg';

function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [liveCourses, setLiveCourses] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    father_name: '', // Added
    gender: 'Male',    // Added
    caste: '',       // Added
    contact: '',
    program: 'Weekday',
    course: '',
    username: '',
    password: ''
  });

  useEffect(() => {
    const fetchCourses = async () => {
      const res = await academyService.getCourses();
      if (res.data && res.data.length > 0) {
        setLiveCourses(res.data);
        setFormData(prev => ({ ...prev, course: res.data[0].name }));
      }
    };
    fetchCourses();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authService.register(formData);
      alert('Enrollment Successful!');
      navigate('/login');
    } catch (error) {
      alert('Error during registration.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section" style={{ background: 'var(--bg)', minHeight: '100vh', padding: '100px 2rem 80px' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <div className="glass fade-in" style={{ background: '#fff', borderRadius: '32px', padding: '50px', boxShadow: '0 30px 60px rgba(0,0,0,0.05)' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <img src={logo} alt="Logo" style={{ width: '90px', borderRadius: '12px', marginBottom: '20px' }} />
            <h2 style={{ fontSize: '2rem', color: 'var(--navy)', fontWeight: '800' }}>Student Enrollment</h2>
          </div>
          
          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '25px' }}>
            {/* Row 1: Name and Father Name */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
              <div className="form-group">
                <label style={{ fontSize: '13px', fontWeight: '700', marginBottom: '8px', display: 'block' }}>Student Name *</label>
                <input type="text" name="name" required value={formData.name} onChange={handleChange} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--border)' }} placeholder="Full Name" />
              </div>
              <div className="form-group">
                <label style={{ fontSize: '13px', fontWeight: '700', marginBottom: '8px', display: 'block' }}>Father / Guardian Name *</label>
                <input type="text" name="father_name" required value={formData.father_name} onChange={handleChange} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--border)' }} placeholder="Father's Name" />
              </div>
            </div>

            {/* Row 2: Gender and Caste */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
              <div className="form-group">
                <label style={{ fontSize: '13px', fontWeight: '700', marginBottom: '8px', display: 'block' }}>Gender *</label>
                <select name="gender" value={formData.gender} onChange={handleChange} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--border)', background: '#fff' }}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label style={{ fontSize: '13px', fontWeight: '700', marginBottom: '8px', display: 'block' }}>Caste / Surname</label>
                <input type="text" name="caste" value={formData.caste} onChange={handleChange} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--border)' }} placeholder="e.g. Sheikh, Syed" />
              </div>
            </div>

            {/* Row 3: Contact and Course */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
              <div className="form-group">
                <label style={{ fontSize: '13px', fontWeight: '700', marginBottom: '8px', display: 'block' }}>Contact Number *</label>
                <input type="tel" name="contact" required value={formData.contact} onChange={handleChange} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--border)' }} placeholder="03XX-XXXXXXX" />
              </div>
              <div className="form-group">
                <label style={{ fontSize: '13px', fontWeight: '700', marginBottom: '8px', display: 'block' }}>Desired Course *</label>
                <select name="course" value={formData.course} onChange={handleChange} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--border)', background: '#fff' }}>
                  {liveCourses.map((c) => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Login Credentials */}
            <div style={{ padding: '20px', background: '#f8f9fc', borderRadius: '15px', marginTop: '10px' }}>
              <h4 style={{ marginBottom: '15px', fontSize: '14px', color: 'var(--navy)' }}>🔐 Portal Login Setup</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
                <input type="text" name="username" required value={formData.username} onChange={handleChange} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--border)' }} placeholder="Username" />
                <input type="password" name="password" required value={formData.password} onChange={handleChange} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--border)' }} placeholder="Password" />
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', padding: '15px', fontWeight: '800' }}>
              {loading ? 'Processing...' : 'Complete Enrollment ✓'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
