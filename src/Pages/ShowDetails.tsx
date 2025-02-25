import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Tv, Calendar, Clock, Signal } from 'lucide-react';
import type { Show } from '../types';

function ShowDetails() {
  const { id } = useParams<{ id: string }>();
  const [show, setShow] = useState<Show | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    axios.get<Show>(`https://api.tvmaze.com/shows/${id}`)
      .then(response => {
        setShow(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch show details');
        setLoading(false);
        console.error(err);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">
          <Tv size={32} />
        </div>
      </div>
    );
  }

  if (error || !show) {
    return (
      <div className="loading-container">
        <div className="error-message">{error || 'Show not found'}</div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="show-details">
        <div className="show-details-header">
          {show.image && (
            <img 
              src={show.image.original} 
              alt={show.name}
              className="show-details-image"
            />
          )}
        </div>
        <div className="show-details-content">
          <h1 className="show-details-title">{show.name}</h1>
          
          <div className="show-meta">
            {show.premiered && (
              <div className="show-meta-item">
                <Calendar size={18} />
                <span>Premiered: {show.premiered}</span>
              </div>
            )}
            {show.status && (
              <div className="show-meta-item">
                <Signal size={18} />
                <span>Status: {show.status}</span>
              </div>
            )}
            {show.schedule && (
              <div className="show-meta-item">
                <Clock size={18} />
                <span>
                  {show.schedule.days.join(', ')} at {show.schedule.time}
                </span>
              </div>
            )}
          </div>

          <div className="genres-container">
            {show.genres.map(genre => (
              <span key={genre} className="genre-tag">
                {genre}
              </span>
            ))}
          </div>

          <div className="show-details-info">
            <div className="show-rating">
              Rating: {show.rating.average || 'N/A'}
            </div>
            <div 
              className="show-details-summary"
              dangerouslySetInnerHTML={{ __html: show.summary }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowDetails;