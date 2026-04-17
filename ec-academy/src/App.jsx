import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useApp } from './context/AppContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import AdminLogin from './pages/AdminLogin';
import Register from './pages/Register';
import StudentPortal from './pages/StudentPortal';
import AdminPortal from './pages/AdminPortal';
import NotFound from './pages/NotFound';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user } = useApp();
  if (!user) return <Navigate to="/login" replace />;
  if (requiredRole && user.role !== requiredRole) return <Navigate to="/" replace />;
  return children;
};

function App() {
  return (
    <Router>
      <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        
        {/* Version Marker - Clean & Professional */}
        <div style={{ background: 'var(--navy)', color: 'rgba(255,255,255,0.3)', textAlign: 'center', fontSize: '9px', padding: '4px' }}>
          Education City Academy • Secure Portal v1.5
        </div>
        
        <main className="main-content" style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/master-access" element={<AdminLogin />} />
            <Route path="/register" element={<Register />} />
            <Route path="/student/*" element={<ProtectedRoute requiredRole="student"><StudentPortal /></ProtectedRoute>} />
            <Route path="/admin/*" element={<ProtectedRoute requiredRole="admin"><AdminPortal /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;
