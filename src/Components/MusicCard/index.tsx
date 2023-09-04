import checkedHeart from '../../images/checked_heart.png';
import emptyHeart from '../../images/empty_heart.png';

type MusicCardProps = {
  trackId: number;
  trackName: string;
  previewUrl: string;
  favoriteMusic: number[];
  setFavoriteMusic: React.Dispatch<React.SetStateAction<number[]>>;
};

function MusicCard({
  trackId,
  trackName,
  previewUrl,
  favoriteMusic,
  setFavoriteMusic }: MusicCardProps) {
  const handleCheckboxChange = () => {
    if (favoriteMusic.includes(trackId)) {
      setFavoriteMusic((prevState) => prevState.filter((id) => id !== trackId));
    } else {
      setFavoriteMusic((prevState) => [...prevState, trackId]);
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
          checked={ favoriteMusic.includes(trackId) }
          onChange={ handleCheckboxChange }
        />
        <img
          src={ favoriteMusic.includes(trackId) ? checkedHeart : emptyHeart }
          alt="favorite"
        />
      </label>
    </div>
  );
}

export default MusicCard;
