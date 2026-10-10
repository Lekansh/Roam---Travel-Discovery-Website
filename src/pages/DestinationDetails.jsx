import React, { useContext, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Heart, Calendar, Wallet, ChevronDown, ChevronUp } from 'lucide-react';
import { destinations } from '../data/destinations';
import { FavoritesContext } from '../context/FavoritesContext';

export default function DestinationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useContext(FavoritesContext);
  // Track which highlight is currently expanded (null = none)
  const [expandedHighlight, setExpandedHighlight] = useState(null);
  
  const destination = destinations.find(d => d.id === id);
  const isFavorite = destination ? favorites.includes(destination.id) : false;

  if (!destination) {
    return (
      <div className="container empty-state">
        <h2>Destination not found</h2>
        <p style={{ color: 'var(--color-text-secondary)', margin: '20px 0' }}>
          We couldn't find the destination you're looking for.
        </p>
        <button onClick={() => navigate('/explore')} className="btn-primary">
          Back to Explore
        </button>
      </div>
    );
  }

  // Toggle a highlight open/closed
  const toggleHighlight = (index) => {
    setExpandedHighlight(expandedHighlight === index ? null : index);
  };

  return (
    <div className="container details-page">
      <Link to="/explore" className="back-link">
        <ArrowLeft size={16} /> Back to explore
      </Link>

      <div className="details-hero" style={{ position: 'relative' }}>
        <img src={destination.image} alt={destination.name} />
        <button 
          className={`fav-btn-absolute ${isFavorite ? 'active' : ''}`}
          style={{ top: '20px', right: '20px', width: '48px', height: '48px' }}
          onClick={() => toggleFavorite(destination.id)}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart size={24} fill={isFavorite ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="details-content">
        <div className="details-main">
          <span style={{ textTransform: 'uppercase', color: 'var(--color-clay)', fontWeight: 600, fontSize: '0.9rem' }}>
            {destination.category}
          </span>
          <h1>{destination.name}</h1>
          <div className="details-location">
            <MapPin size={20} />
            {destination.state}, India
          </div>
          
          <div className="details-desc">
            <p>{destination.fullDescription}</p>
          </div>

          <h3 style={{ marginTop: '40px', marginBottom: '20px' }}>Highlights</h3>
          <ul className="highlights-list">
            {destination.highlights.map((highlight, index) => {
              const isOpen = expandedHighlight === index;
              // Support both old string format and new object format
              const name = typeof highlight === 'string' ? highlight : highlight.name;
              const description = typeof highlight === 'object' ? highlight.description : null;
              const image = typeof highlight === 'object' ? highlight.image : null;

              return (
                <li 
                  key={index} 
                  style={{ 
                    cursor: description ? 'pointer' : 'default',
                    flexDirection: 'column',
                    alignItems: 'stretch',
                    borderBottom: '1px solid var(--color-border)',
                    padding: '12px 0'
                  }}
                  onClick={() => description && toggleHighlight(index)}
                >
                  {/* Highlight name row */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ color: 'var(--color-clay)' }}>&bull;</span>
                      <span>{name}</span>
                    </div>
                    {description && (
                      isOpen 
                        ? <ChevronUp size={18} color="var(--color-text-secondary)" /> 
                        : <ChevronDown size={18} color="var(--color-text-secondary)" />
                    )}
                  </div>

                  {/* Expandable content */}
                  {isOpen && description && (
                    <div className="highlight-detail">
                      {image && (
                        <img 
                          src={image} 
                          alt={name} 
                          className="highlight-image"
                        />
                      )}
                      <p className="highlight-desc">{description}</p>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="details-sidebar">
          <div className="sidebar-item">
            <h4>Best time to visit</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Calendar size={20} color="var(--color-text-secondary)" />
              <span>{destination.bestTimeToVisit}</span>
            </div>
          </div>
          
          <div className="sidebar-item">
            <h4>Estimated Budget</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Wallet size={20} color="var(--color-text-secondary)" />
              <span>{destination.budget}</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginTop: '5px' }}>
              *Illustrative prices for a typical trip
            </p>
          </div>

          <button 
            className={isFavorite ? "btn-secondary" : "btn-primary"} 
            style={{ width: '100%', marginTop: '20px' }}
            onClick={() => toggleFavorite(destination.id)}
          >
            {isFavorite ? 'Remove from favorites' : 'Save to favorites'}
          </button>
        </div>
      </div>
    </div>
  );
}
