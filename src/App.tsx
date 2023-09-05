import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AlbumType, SongType } from './types';
import Layout from './Components/layout';
import Login from './pages/login';
import Search from './pages/search';
import Album from './pages/album';
import Favorites from './pages/favorites';
import Profile from './pages/profile';
import ProfileEdit from './pages/profileEdit';

function App() {
  const [albumsResult, setAlbumsResult] = useState<AlbumType[] | null>(null);
  const [favoriteMusic, setFavoriteMusic] = useState<SongType[]>([]);

  return (
    <div>
      <p>Trybetunes</p>
      <Routes>
        <Route index element={ <Login /> } />
        <Route path="/" element={ <Layout /> }>
          <Route
            path="/search"
            element={ <Search
              albumsResult={ albumsResult }
              setAlbumsResult={ setAlbumsResult }
            /> }
          />
          search
          <Route
            path="/favorites"
            element={
              <Favorites
                favoriteMusic={ favoriteMusic }
                setFavoriteMusic={ setFavoriteMusic }
              />
            }
          />
          <Route
            path="/profile"
            element={ <Profile /> }
          />
          <Route
            path="/profile/edit"
            element={ <ProfileEdit /> }
          />
          <Route
            path="/album/:id"
            element={ <Album
              favoriteMusic={ favoriteMusic }
              setFavoriteMusic={ setFavoriteMusic }
            /> }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
