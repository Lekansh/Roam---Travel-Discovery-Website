import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import DestinationCard from '../components/DestinationCard';
import { destinations } from '../data/destinations';

const CATEGORIES = ['All', 'Mountain retreats', 'Beach getaways', 'Nature escapes', 'Culture and history'];

export default function Explore() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const initialCategory = searchParams.get('category') || 'All';

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  // Update URL when filters change
  useEffect(() => {
    const params = {};
    if (searchQuery) params.search = searchQuery;
    if (selectedCategory !== 'All') params.category = selectedCategory;
    setSearchParams(params, { replace: true });
  }, [searchQuery, selectedCategory, setSearchParams]);

  // Handle URL changes
  useEffect(() => {
    setSearchQuery(searchParams.get('search') || '');
    setSelectedCategory(searchParams.get('category') || 'All');
  }, [searchParams]);

  const filteredDestinations = useMemo(() => {
    return destinations.filter(dest => {
      const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            dest.state.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || dest.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
  };

  return (
    <div className="container" style={{ paddingBottom: '60px' }}>
      <div className="explore-header">
        <h1>Explore somewhere new</h1>
        <p style={{ color: 'var(--color-text-secondary)' }}>Find the perfect destination for your next trip.</p>
      </div>

      <div style={{ marginBottom: '40px' }}>
        <div className="search-input-wrapper" style={{ maxWidth: '600px', margin: '0 auto 30px' }}>
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Search by destination or state..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="category-pills" style={{ justifyContent: 'center' }}>
          {CATEGORIES.map(category => (
            <button
              key={category}
              className={`category-pill ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category === 'All' ? 'All destinations' : category}
            </button>
          ))}
        </div>
      </div>

      {filteredDestinations.length > 0 ? (
        <div className="destination-grid">
          {filteredDestinations.map(dest => (
            <DestinationCard key={dest.id} destination={dest} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h3>No destinations found</h3>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '20px' }}>
            We couldn't find any places matching your search.
          </p>
          <button onClick={resetFilters} className="btn-primary">
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
