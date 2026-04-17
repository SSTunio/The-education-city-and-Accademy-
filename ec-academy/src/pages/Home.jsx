import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { academyService } from '../services/api';
import { courseTracks as defaultTracks } from '../data/courseData';

const CourseCard = ({ track, title, meta, price, color, programType }) => (
  <div className="prog-card fade-in" style={{
    background: 'var(--card)',
    border: '1px solid var(--border)',
    borderRadius: '24px',
    padding: '30px',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 4px 24px rgba(0,0,0,0.03)',
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  }}>
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', background: color }}></div>
    
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        fontSize: '10px',
        fontWeight: '900',
        padding: '6px 14px',
        borderRadius: '30px',
        background: `${color}10`,
        color: color,
        textTransform: 'uppercase',
        letterSpacing: '1px'
      }}>
        {track}
      </div>
      <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>{programType}</span>
    </div>
    
    <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', color: 'var(--navy)', lineHeight: '1.3' }}>{title}</h3>
    <div style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '24px' }}>{meta}</div>
    
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '20px', borderTop: '1px solid var(--border)', marginTop: 'auto' }}>
      <div>
        <div style={{ fontSize: '10px', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '2px' }}>Schedule</div>
        <div style={{ fontWeight: '800', color: 'var(--navy)', fontSize: '0.9rem' }}>{price}</div>
      </div>
      <Link to="/register" className="btn btn-primary" style={{ padding: '10px 18px', fontSize: '12px' }}>Enroll</Link>
    </div>
  </div>
);

function Home() {
  const context = useApp();
  const { stats = {}, setAnnouncements } = context || {};
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const anncRes = await academyService.getAnnouncements();
        setAnnouncements(anncRes.data);

        const courseRes = await academyService.getCourses();
        if (courseRes.data && courseRes.data.length > 0) {
          const mapped = courseRes.data.map(c => ({
            id: c.id,
            track: c.track,
            title: c.name,
            programType: c.program_type,
            meta: `Guided by ${c.trainer || 'Industry Experts'}`,
            price: c.duration || 'Session Based',
            color: c.track === 'Advanced' ? '#e63946' : (c.track === 'Intermediate' ? '#f5a623' : '#00c9a7')
          }));
          setCourses(mapped);
        } else {
          setCourses(defaultTracks.map(c => ({...c, title: c.title, price: c.price})));
        }
      } catch (error) {
        setCourses(defaultTracks);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const weekdayCourses = courses.filter(c => c.programType === 'Weekday');
  const weekendCourses = courses.filter(c => c.programType === 'Weekend');

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero fade-in" style={{
        background: 'var(--navy)',
        padding: 'clamp(80px, 12vh, 140px) 0 clamp(60px, 8vh, 100px)',
        textAlign: 'center',
        position: 'relative',
        color: '#fff',
        overflow: 'hidden'
      }}>
        <div className="container">
          <div style={{ display: 'inline-block', background: 'rgba(0, 201, 167, 0.15)', border: '1px solid rgba(0, 201, 167, 0.3)', color: 'var(--teal-light)', padding: '8px 24px', borderRadius: '30px', fontSize: '12px', fontWeight: '700', marginBottom: '24px' }}>
            ✦ 2026 ADMISSIONS NOW OPEN
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 7vw, 4.5rem)', color: '#fff', marginBottom: '20px', lineHeight: '1.1', fontWeight: '800' }}>
            Empowering the Next <br /><span style={{ color: 'var(--gold)' }}>Generation of Tech</span>
          </h1>
          <p style={{ maxWidth: '700px', margin: '0 auto 40px', color: 'rgba(255,255,255,0.6)', fontSize: 'clamp(1rem, 3vw, 1.2rem)' }}>
            Join our specialized tracks in AI, Cyber Security, and Web Development. Guided by industry professionals in Mir Pado, Tando Jam.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/register" className="btn btn-primary" style={{ padding: '16px 40px' }}>Apply Now</Link>
            <a href="#programs" className="btn btn-outline" style={{ padding: '16px 40px', color: '#fff', borderColor: 'rgba(255,255,255,0.2)' }}>View Courses</a>
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section id="programs" className="section" style={{ background: '#fcfcfd' }}>
        <div className="container">
          
          {/* Weekday Programs */}
          <div style={{ marginBottom: '80px' }}>
            <div style={{ marginBottom: '40px' }}>
              <div style={{ color: 'var(--teal)', fontWeight: '800', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px' }}>Weekday: 2 PM to 9 PM</div>
              <h2 style={{ fontSize: '2.2rem', color: 'var(--navy)' }}>Weekday Programs</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px' }}>
              {weekdayCourses.map((course, index) => (
                <CourseCard key={index} {...course} />
              ))}
            </div>
          </div>

          {/* Weekend Programs */}
          <div>
            <div style={{ marginBottom: '40px' }}>
              <div style={{ color: 'var(--gold)', fontWeight: '800', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px' }}>Weekend: 9 AM to 12 PM</div>
              <h2 style={{ fontSize: '2.2rem', color: 'var(--navy)' }}>Weekend Specials</h2>
              <p style={{ color: 'var(--muted)', marginTop: '8px' }}>Target: Middle School to Matriculation Level</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px' }}>
              {weekendCourses.map((course, index) => (
                <CourseCard key={index} {...course} />
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Location Section */}
      <section id="location" className="section" style={{ background: '#fff', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 500px), 1fr))', gap: '60px', alignItems: 'center' }}>
            <div>
              <div style={{ color: 'var(--gold)', fontWeight: '800', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '12px' }}>Visit Our Campus</div>
              <h2 style={{ fontSize: '2.5rem', color: 'var(--navy)', marginBottom: '24px' }}>Find Us At <br /><span style={{ color: 'var(--teal)' }}>Tando Jam</span></h2>
              <p style={{ color: 'var(--muted)', fontSize: '1.1rem', marginBottom: '32px', lineHeight: '1.7' }}>
                Our state-of-the-art learning center is located in the accessible area of Mir Pado. Join us in a focused environment designed for tech innovation and student growth.
              </p>
              
              <div style={{ display: 'grid', gap: '20px' }}>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ width: '40px', height: '40px', background: '#f8f9fa', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>📍</div>
                  <div>
                    <div style={{ fontWeight: '700', color: 'var(--navy)' }}>Main Campus</div>
                    <div style={{ fontSize: '14px', color: 'var(--muted)' }}>Mir Pado, Tando Jam, Pakistan</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ width: '40px', height: '40px', background: '#f8f9fa', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>🕒</div>
                  <div>
                    <div style={{ fontWeight: '700', color: 'var(--navy)' }}>Operating Hours</div>
                    <div style={{ fontSize: '14px', color: 'var(--muted)' }}>
                      Weekday: 2 PM - 9 PM <br />
                      Weekend: 9 AM - 12 PM
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div style={{ height: '450px', borderRadius: '32px', overflow: 'hidden', boxShadow: '0 40px 100px rgba(0,0,0,0.1)', border: '8px solid #fff' }}>
              {/* Refined Google Maps embed with specific search query and marker */}
              <iframe 
                src="https://maps.google.com/maps?q=Mir%20Pado%20Tando%20Jam&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy"
                title="Mir Pado, Tando Jam Location"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
