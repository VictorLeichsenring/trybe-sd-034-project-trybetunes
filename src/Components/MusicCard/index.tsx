import checkedHeart from '../../images/checked_heart.png';
import emptyHeart from '../../images/empty_heart.png';
import { addSong, removeSong } from '../../services/favoriteSongsAPI';
import { MusicCardProps } from '../../types';

function MusicCard({
  trackId,
  trackName,
  previewUrl,
  favoriteMusic,
  setFavoriteMusic }: MusicCardProps) {
  const isFavorite = favoriteMusic.some((music) => music.trackId === trackId);
  const handleCheckboxChange = async () => {
    if (isFavorite) {
      setFavoriteMusic(
        (prevState) => prevState.filter((music) => music.trackId !== trackId),
      );
      await removeSong({
        trackId,
        trackName,
        previewUrl });
    } else {
      setFavoriteMusic((prevState) => [...prevState, { trackId, trackName, previewUrl }]);
      await addSong({
        trackId,
        trackName,
        previewUrl });
    }
  };
  return (
    <div>
      <h4>{trackName}</h4>
      <audio data-testid="audio-component" src={ previewUrl } controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento
        {' '}
        <code>audio</code>
        .
      </audio>
      <label data-testid={ `checkbox-music-${trackId}` }>
        <input
          type="checkbox"
          checked={ isFavorite }
          onChange={ handleCheckboxChange }
        />
        <img
          src={ isFavorite ? checkedHeart : emptyHeart }
          alt="favorite"
        />
      </label>
    </div>
  );
}

export default MusicCard;
