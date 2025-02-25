import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Tv, Calendar, Clock, Signal, Star } from "lucide-react";
import type { Show } from "../types";

function ShowDetails() {
  const { id } = useParams<{ id: string }>();
  const [show, setShow] = useState<Show | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    axios
      .get<Show>(`https://api.tvmaze.com/shows/${id}`)
      .then((response) => {
        setShow(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch show details");
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
        <div className="error-message">{error || "Show not found"}</div>
      </div>
    );
  }

  return (
    <div className="show-details-container">
      {/* Left: Poster */}
      <div className="show-details-poster">
        {show.image && <img src={show.image.original} alt={show.name} />}
      </div>

      {/* Right: Details */}
      <div className="show-details-content">
        <h1 className="show-title">{show.name}</h1>

        <p className="show-summary" dangerouslySetInnerHTML={{ __html: show.summary }} />

        <div className="show-meta">
          {show.premiered && (
            <div className="meta-item">
              <Calendar size={18} />
              <span>Premiered: {show.premiered}</span>
            </div>
          )}
          {show.ended && (
            <div className="meta-item">
              <Calendar size={18} />
              <span>Ended: {show.ended}</span>
            </div>
          )}
          {show.status && (
            <div className="meta-item">
              <Signal size={18} />
              <span>Status: {show.status}</span>
            </div>
          )}
          {show.averageRuntime && (
            <div className="meta-item">
              <Clock size={18} />
              <span>Runtime: {show.averageRuntime} min</span>
            </div>
          )}
          {show.language && (
            <div className="meta-item">
              <span>Language: {show.language}</span>
            </div>
          )}
          {show.rating.average && (
            <div className="meta-item">
              <Star size={18} />
              <span>Rating: {show.rating.average}</span>
            </div>
          )}
          {show.officialSite && (
            <div className="meta-item">
              <a href={show.officialSite} target="_blank" rel="noopener noreferrer">
                Official Site
              </a>
            </div>
          )}
        </div>

        <div className="show-genres">
          <span>Genres:</span>
          {show.genres.map((genre) => (
            <span key={genre} className="genre-tag">
              {genre}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ShowDetails;
