import { useState, useEffect } from 'react';
import MusicCard from '../../Components/MusicCard';
import { FavoritesProp } from '../../types';
import { getFavoriteSongs } from '../../services/favoriteSongsAPI';
import Carregandomsg from '../../Components/Carregandomsg';

function Favorites({ favoriteMusic, setFavoriteMusic }: FavoritesProp) {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function fetchFavoriteSongs() {
      try {
        const favorites = await getFavoriteSongs();
        setFavoriteMusic(favorites.map((song) => song));
      } catch (error) {
        console.error('Erro ao buscar músicas favoritas:', error);
      }
    }

    fetchFavoriteSongs();
    setIsLoading(false);
  }, [setFavoriteMusic]);
  return (
    <div>
      {isLoading && <Carregandomsg />}
      {!isLoading && (
        favoriteMusic.map((music) => (
          <MusicCard
            key={ music.trackId }
            trackId={ music.trackId }
            trackName={ music.trackName }
            previewUrl={ music.previewUrl }
            favoriteMusic={ favoriteMusic }
            setFavoriteMusic={ setFavoriteMusic }
          />
        ))
      )}
    </div>
  );
}

export default Favorites;
