import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="section" style={{ textAlign: 'center', padding: '120px 2rem', background: 'var(--bg)', minHeight: '70vh' }}>
      <div className="container" style={{ maxWidth: '600px' }}>
        <h1 style={{ fontSize: '6rem', color: 'var(--navy)', marginBottom: '16px' }}>404</h1>
        <h2 style={{ fontSize: '2rem', marginBottom: '24px' }}>Page Not Found</h2>
        <p style={{ color: 'var(--muted)', marginBottom: '32px', fontSize: '1.1rem' }}>
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn btn-primary">Back to Home</Link>
      </div>
    </div>
  );
}

export default NotFound;
