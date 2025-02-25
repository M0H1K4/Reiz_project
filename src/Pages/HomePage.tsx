import { useEffect, useState } from 'react';
import {  Tv } from 'lucide-react';
import ShowCard from '../components/ShowCard';
// import { useTheme } from '../context/ThemeContext';
import type { Show } from '../types';

const SHOWS_PER_PAGE = 12;
const GENRES = ['Action', 'Crime', 'Science-Fiction', 'Drama', 'Thriller', 'Espionage', 'Music', 'Romance'];
const STATUSES = ['all', 'ended', 'running', 'To Be Determined'];

function HomePage() {
  const [shows, setShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  // const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    fetch('https://api.tvmaze.com/shows')
      .then(response => response.json())
      .then(data => {
        setShows(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch shows');
        setLoading(false);
        console.error(err);
      });
  }, []);

  const filteredShows = shows.filter(show => {
    const genreMatch = selectedGenre === 'all' || show.genres.includes(selectedGenre);
    const statusMatch = selectedStatus === 'all' || show.status?.toLowerCase() === selectedStatus.toLowerCase();
    return genreMatch && statusMatch;
  });

  const totalPages = Math.ceil(filteredShows.length / SHOWS_PER_PAGE);
  const startIndex = (currentPage - 1) * SHOWS_PER_PAGE;
  const currentShows = filteredShows.slice(startIndex, startIndex + SHOWS_PER_PAGE);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">
          <Tv size={32} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="loading-container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="home-container"> 
      <div className="content-wrapper">
        <div className="filters">
          <div className="filter-section">
            <h3>Genres</h3>
            <select 
              value={selectedGenre} 
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Genres</option>
              {GENRES.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
          </div>

          <div className="filter-section">
            <h3>Status</h3>
            <select 
              value={selectedStatus} 
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="filter-select"
            >
              {STATUSES.map(status => (
                <option key={status} value={status}>
                  {status === 'all' ? 'All Statuses' : status}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="shows-container">
          <div className="shows-grid">
            {currentShows.map(show => (
              <ShowCard key={show.id} show={show} />
            ))}
          </div>

          <div className="pagination">
            <button
              className="page-button"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(page => 
                page === 1 || 
                page === totalPages || 
                (page >= currentPage - 2 && page <= currentPage + 2)
              )
              .map(page => (
                <button
                  key={page}
                  className={`page-button ${page === currentPage ? 'active' : ''}`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}
            <button
              className="page-button"
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;