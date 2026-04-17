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
    father_name: '',
    gender: 'Male',
    caste: '',
    education: '',
    contact: '',
    program: 'Weekday',
    course: '',
    fee_plan: 'Monthly', // New Field
    username: '',
    password: ''
  });

  const getCourseFee = (courseName) => {
    if (!courseName) return 'Select a course to view fees';
    const normalized = courseName.toLowerCase();
    
    if (normalized.includes('ai') || normalized.includes('intelligence') || normalized.includes('machine learning')) return 'Rs 3,500/mo (Total: Rs 10,500 for 3 months)';
    if (normalized.includes('hack') || normalized.includes('cyber')) return 'Rs 3,500/mo (Total: Rs 10,500 for 3 months)';
    if (normalized.includes('web')) return 'Rs 2,000/mo (Total: Rs 6,000 for 3 months)';
    if (normalized.includes('python')) return 'Rs 2,000/mo (Total: Rs 4,000 for 2 months)';
    if (normalized.includes('electronic')) return 'Rs 2,000/mo (Total: Rs 5,000 for ~10 weeks)';
    if (normalized.includes('arduino')) return 'Rs 2,000/mo (Total: Rs 4,000 for 2 months)';
    if (normalized.includes('computer')) return 'Rs 1,500/mo (Total: Rs 3,000 for 2 months)';
    if (normalized.includes('english')) return 'Rs 1,500/mo (Total: Rs 3,000 for 2 months)';
    
    return 'Rs 2,000/mo (Standard Rate)'; // Fallback
  };

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
    <div className="section register-section" style={{ background: 'var(--bg)', minHeight: '100vh', padding: 'clamp(80px, 10vw, 120px) clamp(15px, 5vw, 2rem) 80px' }}>
      <div className="container" style={{ maxWidth: '800px', padding: 0 }}>
        <div className="glass fade-in register-card" style={{ background: '#fff', borderRadius: '32px', padding: 'clamp(25px, 6vw, 50px)', boxShadow: '0 30px 60px rgba(0,0,0,0.05)' }}>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(20px, 5vw, 40px)' }}>
            <img src={logo} alt="Logo" style={{ width: 'clamp(60px, 15vw, 90px)', borderRadius: '12px', marginBottom: '20px' }} />
            <h2 style={{ fontSize: 'clamp(1.5rem, 5vw, 2rem)', color: 'var(--navy)', fontWeight: '800' }}>Student Enrollment</h2>
          </div>
          
          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '25px' }}>
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

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
              <div className="form-group">
                <label style={{ fontSize: '13px', fontWeight: '700', marginBottom: '8px', display: 'block' }}>Previous Education *</label>
                <input type="text" name="education" required value={formData.education} onChange={handleChange} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--border)' }} placeholder="e.g. Intermediate, Matric" />
              </div>
              <div className="form-group">
                <label style={{ fontSize: '13px', fontWeight: '700', marginBottom: '8px', display: 'block' }}>Contact Number *</label>
                <input type="tel" name="contact" required value={formData.contact} onChange={handleChange} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--border)' }} placeholder="03XX-XXXXXXX" />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
              <div className="form-group">
                <label style={{ fontSize: '13px', fontWeight: '700', marginBottom: '8px', display: 'block' }}>Desired Course *</label>
                <select name="course" value={formData.course} onChange={handleChange} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--border)', background: '#fff' }}>
                  {liveCourses.map((c) => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label style={{ fontSize: '13px', fontWeight: '700', marginBottom: '8px', display: 'block' }}>Fee Plan *</label>
                <select name="fee_plan" value={formData.fee_plan} onChange={handleChange} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--border)', background: '#fff' }}>
                  <option value="Monthly">Monthly Installment</option>
                  <option value="Full Course">Full Course Payment</option>
                  <option value="Scholarship">Scholarship / Free</option>
                </select>
              </div>
            </div>

            {/* Dynamic Fee Display */}
            <div style={{ background: 'var(--navy)', color: '#fff', padding: '20px', borderRadius: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h4 style={{ fontSize: '13px', color: 'var(--gold)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>Course Investment</h4>
                <div style={{ fontSize: '18px', fontWeight: '800' }}>{getCourseFee(formData.course)}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)' }}>Registration Fee</div>
                <div style={{ fontSize: '14px', fontWeight: '700' }}>Rs 500 <span style={{fontSize: '10px', fontWeight: 'normal'}}>(One-time)</span></div>
              </div>
            </div>

            <div style={{ padding: '20px', background: '#f8f9fc', borderRadius: '15px', marginTop: '10px' }}>
              <h4 style={{ marginBottom: '15px', fontSize: '14px', color: 'var(--navy)' }}>🔐 Portal Login Setup</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
                <input type="text" name="username" required value={formData.username} onChange={handleChange} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--border)' }} placeholder="Username" />
                <input type="password" name="password" required value={formData.password} onChange={handleChange} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--border)' }} placeholder="Password" />
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', padding: '15px', fontWeight: '800', marginTop: '10px' }}>
              {loading ? 'Processing...' : 'Complete Enrollment →'}
            </button>
          </form>
        </div>
      </div>
      
      <style>{`
        .register-card .form-group {
          margin-bottom: 0;
        }
        @media (max-width: 600px) {
          .register-card form > div[style*="display: grid"] {
            grid-template-columns: 1fr !important;
            gap: 15px !important;
          }
          .register-card input, .register-card select {
            padding: 14px !important; /* Larger touch targets */
            font-size: 14px !important;
          }
        }
      `}</style>
    </div>
  );
}

export default Register;
