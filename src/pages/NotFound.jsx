import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="container empty-state" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <h1 style={{ fontSize: '4rem', marginBottom: '10px' }}>404</h1>
      <h3>Looks like you're lost</h3>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '30px' }}>
        We couldn't find the page you're looking for. Let's get you back on track.
      </p>
      <div>
        <Link to="/" className="btn-primary" style={{ marginRight: '15px' }}>
          Go Home
        </Link>
        <Link to="/explore" className="btn-secondary">
          Explore Destinations
        </Link>
      </div>
    </div>
  );
}
