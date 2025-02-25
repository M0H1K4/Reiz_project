// import React from 'react';
import { useFavorites } from '../context/FavoriteContext';
import ShowCard from '../components/ShowCard';
import { useEffect, useState } from 'react';
import type { Show } from '../types';

function FavoritesPage() {
  const { favorites } = useFavorites();
  const [favoriteShows, setFavoriteShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all(
      favorites.map(id => 
        fetch(`https://api.tvmaze.com/shows/${id}`).then(res => res.json())
      )
    ).then(shows => {
      setFavoriteShows(shows);
      setLoading(false);
    });
  }, [favorites]);

  if (loading) {
    return <div className="loading">Loading favorites...</div>;
  }

  return (
    <div className="container_favorites">
      <h1 className="title">My Favorites</h1>
      {favoriteShows.length === 0 ? (
        <div className="no-favorites">
          <p>You haven't added any shows to your favorites yet.</p>
        </div>
      ) : (
        <div className="shows-grid">
          {favoriteShows.map(show => (
            <ShowCard key={show.id} show={show} />
          ))}
        </div>
      )}
    </div>
  );
}

export default FavoritesPage;