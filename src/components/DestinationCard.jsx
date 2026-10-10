import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin } from 'lucide-react';
import { FavoritesContext } from '../context/FavoritesContext';

export default function DestinationCard({ destination }) {
  const { favorites, toggleFavorite } = useContext(FavoritesContext);
  const isFavorite = favorites.includes(destination.id);

  const handleFavoriteClick = (e) => {
    e.preventDefault(); // Prevent navigating to details page
    toggleFavorite(destination.id);
  };

  return (
    <Link to={`/destination/${destination.id}`} className="destination-card">
      <div className="card-image-wrapper">
        <img src={destination.image} alt={destination.name} className="card-image" loading="lazy" />
        <button 
          className={`fav-btn-absolute ${isFavorite ? 'active' : ''}`}
          onClick={handleFavoriteClick}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
        </button>
      </div>
      <div className="card-content">
        <span className="card-category">{destination.category}</span>
        <h3 className="card-title">{destination.name}</h3>
        <div className="card-location">
          <MapPin size={16} />
          {destination.state}, India
        </div>
        <p className="card-desc">{destination.shortDescription}</p>
        <div className="card-footer">
          <span className="card-budget">{destination.budget}</span>
          <span style={{ color: 'var(--color-clay)', fontWeight: 500 }}>View details &rarr;</span>
        </div>
      </div>
    </Link>
  );
}
