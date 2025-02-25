import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Search as SearchIcon, Tv } from 'lucide-react';
import type { Show } from '../types';

function SearchPage() {
  const [query, setQuery] = useState('');
  const [shows, setShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get<Array<{ show: Show }>>(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`);
      setShows(response.data.map(item => item.show));
      setLoading(false);
    } catch (err) {
      setError('Failed to search shows');
      setLoading(false);
      console.error(err);
    }
  };

  return (
    <div className="containe-search">
      <h1 className="title">Search TV Shows</h1>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for TV shows..."
          className="search-input"
        />
        <button type="submit" className="search-button">
          <SearchIcon size={20} />
        </button>
      </form>

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner">
            <Tv size={32} />
          </div>
        </div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : shows.length > 0 ? (
        <div className="search-results">
          <div className="shows-grid">
            {shows.map(show => (
              <div key={show.id} className="show-card_2">
                <Link to={`/show/${show.id}`} className="show-link">
                  {show.image && (
                    <img 
                      src={show.image.medium} 
                      alt={show.name}
                      className="show-image"
                    />
                  )}
                  <div className="show-content">
                    <h2 className="show-title">{show.name}</h2>
                    <div className="genres-container">
                      {show.genres.map(genre => (
                        <span key={genre} className="genre-tag">
                          {genre}
                        </span>
                      ))}
                    </div>
                    <div className="show-rating">
                      Rating: {show.rating.average || 'N/A'}
                    </div>
                    {show.summary && (
                      <div 
                        className="show-summary"
                        dangerouslySetInnerHTML={{ 
                          __html: show.summary.slice(0, 150) + '...'
                        }}
                      />
                    )}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      ) : query && (
        <div className="no-results">
          No shows found for "{query}"
        </div>
      )}
    </div>
  );
}

export default SearchPage;