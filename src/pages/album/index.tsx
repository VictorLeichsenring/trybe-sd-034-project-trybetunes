import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import getMusics from '../../services/musicsAPI';
import Carregandomsg from '../../Components/Carregandomsg';
import MusicCard from '../../Components/MusicCard';
import { AlbumType, SongType } from '../../types';

function Album() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [albumInfo, setAlbumInfo] = useState<AlbumType | null>(null);
  const [musics, setMusics] = useState<SongType[]>([]);

  useEffect(() => {
    async function fetchMusics() {
      if (!id) {
        console.error('ID do álbum não fornecido');
        return;
      }

      try {
        setIsLoading(true);
        const results = await getMusics(id);
        setAlbumInfo(results[0] as AlbumType);
        setMusics(results.slice(1) as SongType[]);
        setIsLoading(false);
      } catch (error) {
        console.error('Erro ao buscar as músicas:', error);
        setIsLoading(false);
      }
    }

    fetchMusics();
  }, [id]);

  return (
    <div>
      {/* Carregamento */}
      {isLoading && <Carregandomsg />}

      {/* Exibindo informações do álbum */}
      {!isLoading && albumInfo && (
        <>
          <h2 data-testid="artist-name">{albumInfo.artistName}</h2>
          <h3 data-testid="album-name">{albumInfo.collectionName}</h3>

          {/* Renderizar as músicas */}
          {musics.map((music) => (
            <MusicCard
              key={ music.trackId }
              trackName={ music.trackName }
              previewUrl={ music.previewUrl }
            />
          ))}
        </>
      )}
    </div>
  );
}

export default Album;
