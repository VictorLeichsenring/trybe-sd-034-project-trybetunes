import { useState } from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../../services/searchAlbumsAPI';
import Carregandomsg from '../../Components/Carregandomsg';
import { AlbumType } from '../../types';

type SearchProps = {
  albumsResult: AlbumType[] | null;
  setAlbumsResult: React.Dispatch<React.SetStateAction<AlbumType[] | null>>;
};

function Search({ albumsResult, setAlbumsResult }: SearchProps) {
  const [artistName, setArtistName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // const [albumsResult, setAlbumsResult] = useState(null);
  const [searchedArtist, setSearchedArtist] = useState('');

  async function handleClickPesquisar(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    const results = await searchAlbumsAPI(artistName);
    setAlbumsResult(results);
    setSearchedArtist(artistName);
    setIsLoading(false);
    setArtistName('');
  }
  return (
    <div>
      {/* Formulário de pesquisa */}
      <form onSubmit={ handleClickPesquisar }>
        <input
          data-testid="search-artist-input"
          type="text"
          placeholder="Nome do Artista"
          value={ artistName }
          onChange={ ({ target }) => setArtistName(target.value) }
        />
        <button
          data-testid="search-artist-button"
          disabled={ artistName.length <= 1 }
        >
          Pesquisar
        </button>
      </form>

      {/* Carregamento */}
      {isLoading && <Carregandomsg />}

      {/* Exibir mensagem se não houver álbuns */}
      {albumsResult && albumsResult.length === 0 && (
        <div>Nenhum álbum foi encontrado</div>
      )}

      {/* Exibir resultados se houver álbuns */}
      {albumsResult && albumsResult.length > 0 && (
        <div>
          <h2>
            Resultado de álbuns de:
            {' '}
            {searchedArtist}
          </h2>
          <ul>
            {albumsResult.map((album) => (
              <li key={ album.collectionId }>
                <Link
                  to={ `/album/${album.collectionId}` }
                  data-testid={ `link-to-album-${album.collectionId}` }
                >
                  {album.collectionName}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Search;
