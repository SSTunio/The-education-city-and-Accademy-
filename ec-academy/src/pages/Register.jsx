import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api';
import logo from '../assets/logo.jpg';

function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    name_ur: '',
    dob: '',
    gender: 'Male',
    cnic: '',
    class_name: 'Beginner',
    address: '',
    father_name: '',
    contact: '',
    email: '',
    whatsapp: '',
    program: 'Weekday',
    course: 'Web Development',
    batch: 'Morning',
    source: 'Social Media',
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authService.register(formData);
      alert('Registration successful! Redirecting to login...');
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section" style={{ background: 'var(--bg)', minHeight: '100vh', padding: '120px 2rem 80px' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        <div className="glass fade-in" style={{ background: '#fff', borderRadius: '32px', padding: '60px', boxShadow: '0 30px 60px rgba(0,0,0,0.05)' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <img 
              src={logo} 
              alt="EC Academy" 
              style={{ width: '100px', height: 'auto', borderRadius: '12px', marginBottom: '24px' }} 
            />
            <h2 style={{ fontSize: '2.4rem', color: 'var(--navy)', marginBottom: '12px', fontWeight: '800' }}>Join the Academy</h2>
            <p style={{ color: 'var(--muted)', fontSize: '1.1rem' }}>طالب علم کا اندراج فارم — Start your transition to tech excellence</p>
          </div>
          
          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '40px' }}>
            {/* Section: Personal Info */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--gold)', color: 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '14px' }}>1</div>
                <h4 style={{ fontSize: '15px', color: 'var(--navy)', textTransform: 'uppercase', letterSpacing: '1px' }}>Personal Information</h4>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                <div className="form-group">
                  <label style={{ fontSize: '13px', fontWeight: '600', marginBottom: '10px', display: 'block' }}>Full Name (English) *</label>
                  <input type="text" name="name" required value={formData.name} onChange={handleChange} style={{ width: '100%', padding: '14px 18px', borderRadius: '14px', border: '1px solid var(--border)', fontSize: '14px', background: '#fcfcfd' }} placeholder="Muhammad Bilal" />
                </div>
                <div className="form-group">
                  <label style={{ fontSize: '13px', fontWeight: '600', marginBottom: '10px', display: 'block' }}>نام (اردو) *</label>
                  <input dir="rtl" type="text" name="name_ur" required value={formData.name_ur} onChange={handleChange} style={{ width: '100%', padding: '14px 18px', borderRadius: '14px', border: '1px solid var(--border)', fontSize: '14px', background: '#fcfcfd' }} placeholder="محمد بلال" />
                </div>
                <div className="form-group">
                  <label style={{ fontSize: '13px', fontWeight: '600', marginBottom: '10px', display: 'block' }}>Contact Number *</label>
                  <input type="tel" name="contact" required value={formData.contact} onChange={handleChange} style={{ width: '100%', padding: '14px 18px', borderRadius: '14px', border: '1px solid var(--border)', fontSize: '14px', background: '#fcfcfd' }} placeholder="03XX-XXXXXXX" />
                </div>
              </div>
            </div>

            {/* Section: Program Selection */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--gold)', color: 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '14px' }}>2</div>
                <h4 style={{ fontSize: '15px', color: 'var(--navy)', textTransform: 'uppercase', letterSpacing: '1px' }}>Course Selection</h4>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                <div className="form-group">
                  <label style={{ fontSize: '13px', fontWeight: '600', marginBottom: '10px', display: 'block' }}>Select Program *</label>
                  <select name="program" value={formData.program} onChange={handleChange} style={{ width: '100%', padding: '14px 18px', borderRadius: '14px', border: '1px solid var(--border)', fontSize: '14px', background: '#fff' }}>
                    <option value="Weekday">Weekday Track (5 Days)</option>
                    <option value="Weekend">Weekend Track (Sat & Sun)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label style={{ fontSize: '13px', fontWeight: '600', marginBottom: '10px', display: 'block' }}>Desired Course *</label>
                  <select name="course" value={formData.course} onChange={handleChange} style={{ width: '100%', padding: '14px 18px', borderRadius: '14px', border: '1px solid var(--border)', fontSize: '14px', background: '#fff' }}>
                    <option>Web Development</option>
                    <option>Python AI/ML</option>
                    <option>Ethical Hacking</option>
                    <option>Basic Computing</option>
                    <option>Robotics & IoT</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section: Credentials */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--gold)', color: 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '14px' }}>3</div>
                <h4 style={{ fontSize: '15px', color: 'var(--navy)', textTransform: 'uppercase', letterSpacing: '1px' }}>Portal Credentials</h4>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                <div className="form-group">
                  <label style={{ fontSize: '13px', fontWeight: '600', marginBottom: '10px', display: 'block' }}>Username *</label>
                  <input type="text" name="username" required value={formData.username} onChange={handleChange} style={{ width: '100%', padding: '14px 18px', borderRadius: '14px', border: '1px solid var(--border)', fontSize: '14px', background: '#fcfcfd' }} placeholder="student123" />
                </div>
                <div className="form-group">
                  <label style={{ fontSize: '13px', fontWeight: '600', marginBottom: '10px', display: 'block' }}>Password *</label>
                  <input type="password" name="password" required value={formData.password} onChange={handleChange} style={{ width: '100%', padding: '14px 18px', borderRadius: '14px', border: '1px solid var(--border)', fontSize: '14px', background: '#fcfcfd' }} placeholder="••••••••" />
                </div>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', padding: '20px', fontSize: '1.1rem', marginTop: '20px', borderRadius: '16px', opacity: loading ? 0.7 : 1 }}>
              {loading ? 'Processing...' : 'Submit Enrollment — اندراج مکمل کریں ✓'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
