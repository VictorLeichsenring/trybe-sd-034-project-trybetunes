export type AlbumType = {
  artistId: number;
  artistName: string;
  collectionId: number;
  collectionName: string;
  collectionPrice: number;
  artworkUrl100: string;
  releaseDate: string;
  trackCount: number;
};

export type UserType = {
  name: string;
  email: string;
  image: string;
  description: string;
};

export type SongType = {
  trackId: number,
  trackName: string,
  previewUrl: string,
};

export type FavoriteMusic = {
  trackID: number,
};

export type MusicCardProps = {
  trackId: number;
  trackName: string;
  previewUrl: string;
  favoriteMusic: SongType[];
  setFavoriteMusic: React.Dispatch<React.SetStateAction<SongType[]>>;
};

export type AlbumProps = {
  favoriteMusic: SongType[];
  setFavoriteMusic: React.Dispatch<React.SetStateAction<SongType[]>>;
};

export type FavoritesProp = {
  favoriteMusic: SongType[],
  setFavoriteMusic: React.Dispatch<React.SetStateAction<SongType[]>>
};
