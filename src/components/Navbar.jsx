import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { FavoritesContext } from '../context/FavoritesContext';

export default function Navbar() {
  const { favorites } = useContext(FavoritesContext);
  const location = useLocation();

  return (
    <div className="container">
      <nav className="navbar">
        <Link to="/" className="nav-brand">
          roam.
        </Link>
        
        <div className="nav-links">
          <Link 
            to="/explore" 
            className="nav-link" 
            style={{ color: location.pathname === '/explore' ? 'var(--color-clay)' : '' }}
          >
            Explore
          </Link>
          <Link 
            to="/favorites" 
            className="nav-link"
            style={{ 
              color: location.pathname === '/favorites' ? 'var(--color-clay)' : '',
              display: 'flex', 
              alignItems: 'center', 
              gap: '5px' 
            }}
          >
            Favorites {favorites.length > 0 && <span>({favorites.length})</span>}
          </Link>
        </div>
      </nav>
    </div>
  );
}
