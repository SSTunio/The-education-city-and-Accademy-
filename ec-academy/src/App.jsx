import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentPortal from './pages/StudentPortal';
import AdminPortal from './pages/AdminPortal';
import NotFound from './pages/NotFound';

function App() {
  console.log("App component rendering v1.1...");
  
  return (
    <Router>
      <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        {/* Version Marker for Cache Verification */}
        <div style={{ background: 'var(--navy)', color: 'var(--gold)', textAlign: 'center', fontSize: '10px', padding: '4px', fontWeight: 'bold', borderBottom: '1px solid rgba(245, 166, 35, 0.2)' }}>
          EDUCATION CITY ACADEMY v1.1 • PRODUCTION READY • DIRECT SYNC ACTIVE
        </div>
        
        <main className="main-content" style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/student/*" element={<StudentPortal />} />
            <Route path="/admin/*" element={<AdminPortal />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        
        <Footer />

        {/* Floating WhatsApp Button */}
        <a 
          href="https://wa.me/923126741558" 
          target="_blank" 
          rel="noreferrer"
          className="whatsapp-float"
          style={{
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            width: '60px',
            height: '60px',
            backgroundColor: '#25d366',
            color: '#fff',
            borderRadius: '50px',
            textAlign: 'center',
            fontSize: '30px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000,
            transition: '0.3s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <svg width="35" height="35" viewBox="0 0 24 24" fill="white">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.438 9.889-9.886.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.98zm11.387-5.464c-.301-.15-1.781-.879-2.056-.979-.275-.1-.475-.15-.675.15-.2.3-.775 1.05-1.001 1.25-.225.225-.45.251-.75.101-.3-.15-1.266-.467-2.413-1.485-.892-.796-1.494-1.779-1.669-2.079-.175-.3-.019-.462.131-.611.134-.134.3-.35.45-.525.151-.175.201-.3.301-.5.1-.2.05-.375-.025-.525-.075-.15-.675-1.625-.925-2.225-.244-.588-.491-.508-.675-.518-.174-.01-.374-.012-.574-.012-.2 0-.525.075-.8.375-.275.3-1.05 1.025-1.05 2.5 0 1.475 1.075 2.9 1.225 3.1.15.2 2.115 3.23 5.125 4.527.715.308 1.274.493 1.709.631.718.228 1.37.196 1.885.119.573-.086 1.781-.728 2.031-1.429.25-.701.25-1.301.175-1.429-.075-.128-.275-.203-.575-.353z" />
          </svg>
        </a>
      </div>
    </Router>
  );
}

export default App;
