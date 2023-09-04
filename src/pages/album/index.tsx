import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import getMusics from '../../services/musicsAPI';
import Carregandomsg from '../../Components/Carregandomsg';
import MusicCard from '../../Components/MusicCard';
import { AlbumType, SongType } from '../../types';
import { getFavoriteSongs } from '../../services/favoriteSongsAPI';

type AlbumProps = {
  favoriteMusic: SongType[];
  setFavoriteMusic: React.Dispatch<React.SetStateAction<SongType[]>>;
};

function Album({ favoriteMusic, setFavoriteMusic }: AlbumProps) {
  const { id: albumId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [albumInfo, setAlbumInfo] = useState<AlbumType | null>(null);
  const [musics, setMusics] = useState<SongType[]>([]);

  useEffect(() => {
    async function fetchMusics() {
      if (!albumId) {
        console.error('ID do álbum não fornecido');
        return;
      }

      try {
        setIsLoading(true);
        const results = await getMusics(albumId);
        setAlbumInfo(results[0] as AlbumType);
        setMusics(results.slice(1) as SongType[]);
        setIsLoading(false);
      } catch (error) {
        console.error('Erro ao buscar as músicas:', error);
        setIsLoading(false);
      }
    }

    fetchMusics();
  }, [albumId]);

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
  }, [setFavoriteMusic]);

  return (
    <div>
      {isLoading && <Carregandomsg />}
      {!isLoading && albumInfo && (
        <>
          <h2 data-testid="artist-name">{albumInfo.artistName}</h2>
          <h3 data-testid="album-name">{albumInfo.collectionName}</h3>
          {musics.map((music) => (
            <MusicCard
              key={ music.trackId }
              trackId={ music.trackId }
              trackName={ music.trackName }
              previewUrl={ music.previewUrl }
              favoriteMusic={ favoriteMusic }
              setFavoriteMusic={ setFavoriteMusic }
            />
          ))}
        </>
      )}
    </div>
  );
}

export default Album;
