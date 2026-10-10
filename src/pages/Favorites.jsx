import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import DestinationCard from '../components/DestinationCard';
import { destinations } from '../data/destinations';
import { FavoritesContext } from '../context/FavoritesContext';

export default function Favorites() {
  const { favorites } = useContext(FavoritesContext);
  
  const favoriteDestinations = destinations.filter(dest => favorites.includes(dest.id));

  return (
    <div className="container" style={{ padding: '40px 0', minHeight: '60vh' }}>
      <h1 style={{ marginBottom: '10px' }}>Your saved places</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '40px' }}>
        {favorites.length} {favorites.length === 1 ? 'destination' : 'destinations'} saved for later.
      </p>

      {favoriteDestinations.length > 0 ? (
        <div className="destination-grid">
          {favoriteDestinations.map(dest => (
            <DestinationCard key={dest.id} destination={dest} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🤍</div>
          <h3>No favorites yet</h3>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '20px' }}>
            Start exploring and save places you'd love to visit.
          </p>
          <Link to="/explore" className="btn-primary">
            Explore destinations
          </Link>
        </div>
      )}
    </div>
  );
}
