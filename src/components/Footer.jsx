import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-brand">roam.</div>
        <p>Find your next happy place.</p>
        <div className="footer-nav">
          <Link to="/">Home</Link>
          <Link to="/explore">Explore</Link>
          <Link to="/favorites">Favorites</Link>
        </div>
        <p style={{ fontSize: '0.8rem', marginTop: '20px' }}>
          &copy; {new Date().getFullYear()} Roam. All destination information is illustrative sample content.
        </p>
      </div>
    </footer>
  );
}
