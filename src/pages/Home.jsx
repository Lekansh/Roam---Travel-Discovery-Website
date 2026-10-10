import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import DestinationCard from '../components/DestinationCard';
import { destinations } from '../data/destinations';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/explore');
    }
  };

  // Get 3 popular destinations for the home page
  const popularDestinations = destinations.slice(0, 3);

  return (
    <div className="container">
      <section className="hero">
        <div className="hero-content">
          <span className="hero-label">Your next adventure starts here</span>
          <h1>Find your next happy place.</h1>
          <p>Discover beautiful destinations, save your favorites, and get inspired for your next journey.</p>
          
          <form onSubmit={handleSearch} className="hero-search">
            <div className="search-input-wrapper">
              <Search className="search-icon" size={20} />
              <input
                type="text"
                placeholder="Where would you like to go?"
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button type="submit" className="btn-primary">Explore</button>
          </form>
        </div>
        <img 
          src="https://thumb.wikimedia.org/wikipedia/commons/thumb/4/44/Breathtaking_beauty_of_Dzukou_Valley_in_Manipur-Nagaland_border_%28edit%29.jpg/1280px-Breathtaking_beauty_of_Dzukou_Valley_in_Manipur-Nagaland_border_%28edit%29.jpg" 
          alt="Beautiful travel landscape" 
          className="hero-image"
        />
      </section>

      <section style={{ padding: '60px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2>Popular destinations</h2>
          <Link to="/explore" style={{ color: 'var(--color-clay)', fontWeight: 500 }}>
            View all &rarr;
          </Link>
        </div>
        <div className="destination-grid">
          {popularDestinations.map(dest => (
            <DestinationCard key={dest.id} destination={dest} />
          ))}
        </div>
      </section>

      <section style={{ padding: '40px 0', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '30px' }}>Curated collections</h2>
        <div className="category-pills" style={{ justifyContent: 'center' }}>
          {['Nature escapes', 'Beach getaways', 'Mountain retreats', 'Culture and history'].map(category => (
            <Link 
              key={category} 
              to={`/explore?category=${encodeURIComponent(category)}`}
              className="category-pill"
            >
              {category}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
