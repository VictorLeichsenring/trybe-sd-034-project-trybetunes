import React from 'react';
import { SongType } from '../../types';

interface MusicCardProps {
  trackName: SongType['trackName'];
  previewUrl: SongType['previewUrl'];
}

function MusicCard({ trackName, previewUrl }: MusicCardProps) {
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
    </div>
  );
}

export default MusicCard;
