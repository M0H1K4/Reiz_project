import { useEffect, useState } from "react";
import { Tv, ChevronDown, Check } from "lucide-react";
import ShowCard from "../components/ShowCard";
import type { Show } from "../types";

const SHOWS_PER_PAGE = 12;
const GENRES = ["Action", "Crime", "Science-Fiction", "Drama", "Thriller", "Espionage", "Music", "Romance"];
const STATUSES = ["all", "ended", "running", "To Be Determined"];

function HomePage() {
  const [shows, setShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [isGenreDropdownOpen, setIsGenreDropdownOpen] = useState(false);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);

  useEffect(() => {
    fetch("https://api.tvmaze.com/shows")
      .then((response) => response.json())
      .then((data) => {
        setShows(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch shows");
        setLoading(false);
        console.error(err);
      });
  }, []);

  const toggleGenre = (genre: string) => {
    setSelectedGenre((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const handleStatusSelect = (status: string) => {
    setSelectedStatus(status);
    setIsStatusDropdownOpen(false);
  };

  const filteredShows = shows.filter((show) => {
    const genreMatch =
      selectedGenre.length === 0 ||
      selectedGenre.includes("all") ||
      show.genres.some((genre) => selectedGenre.includes(genre));
    const statusMatch = selectedStatus === "all" || show.status?.toLowerCase() === selectedStatus.toLowerCase();
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
          {/* Genre Dropdown */}
          <div className="dropdown">
            <button className="dropdown-button" onClick={() => setIsGenreDropdownOpen(!isGenreDropdownOpen)}>
              Genres filter ({selectedGenre.length}) <ChevronDown size={16} />
            </button>
            {isGenreDropdownOpen && (
              <div className="dropdown-menu">
                {GENRES.map((genre) => (
                  <label key={genre} className="dropdown-item">
                    <input type="checkbox" checked={selectedGenre.includes(genre)} onChange={() => toggleGenre(genre)} />
                    <span className="checkmark">{selectedGenre.includes(genre) && <Check size={12} />}</span>
                    {genre}
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Status Dropdown */}
          <div className="dropdown">
            <button className="dropdown-button" onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}>
              Status: {selectedStatus.charAt(0).toUpperCase() + selectedStatus.slice(1)} <ChevronDown size={16} />
            </button>
            {isStatusDropdownOpen && (
              <div className="dropdown-menu">
                {STATUSES.map((status) => (
                  <label key={status} className="dropdown-item" onClick={() => handleStatusSelect(status)}>
                    <span className="checkmark">{selectedStatus === status && <Check size={12} />}</span>
                    {status === "all" ? "All Statuses" : status}
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Shows Grid */}
        <div className="shows-container">
          <div className="shows-grid">
            {currentShows.map((show) => (
              <ShowCard key={show.id} show={show} />
            ))}
          </div>

          {/* Pagination */}
          <div className="pagination">
            <button className="page-button" onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1}>
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((page) => page === 1 || page === totalPages || (page >= currentPage - 2 && page <= currentPage + 2))
              .map((page) => (
                <button key={page} className={`page-button ${page === currentPage ? "active" : ""}`} onClick={() => setCurrentPage(page)}>
                  {page}
                </button>
              ))}
            <button className="page-button" onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
