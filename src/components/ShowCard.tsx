import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useFavorites } from '../context/FavoriteContext';
import type { Show } from '../types';

interface ShowCardProps {
  show: Show;
}

function ShowCard({ show }: ShowCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();

  return (
    <div className="show-card">
      <div className="show-card-header">
        <Link to={`/show/${show.id}`}>
          {show.image?.medium && (
            <img 
              src={show.image.medium} 
              alt={show.name}
              className="show-image"
            />
          )}
        </Link>
        <button 
          className={`favorite-button ${isFavorite(show.id) ? 'active' : ''}`}
          onClick={() => toggleFavorite(show.id)}
        >
          <Heart size={20} />
        </button>
      </div>
      <div className="show-content">
        <Link to={`/show/${show.id}`} className="show-link">
          <h2 className="show-title">{show.name}</h2>
        </Link>
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
        <div 
          className="show-summary"
          dangerouslySetInnerHTML={{ 
            __html: show.summary ? show.summary.slice(0, 150) + '...' : 'No summary available'
          }}
        />
      </div>
    </div>
  );
}

export default ShowCard;
