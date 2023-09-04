import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Search from './pages/search';
import { AlbumType } from './types';
import Album from './pages/album';

function App() {
  const [albumsResult, setAlbumsResult] = useState<AlbumType[] | null>(null);

  return (
    <div>
      <p>Trybetunes</p>
      <Routes>
        <Route path="/" element={ <Login /> }>Login</Route>
        <Route
          path="/search"
          element={ <Search
            albumsResult={ albumsResult }
            setAlbumsResult={ setAlbumsResult }
          /> }
        >
          search
        </Route>
        <Route path="/album/:id" element={ <Album /> } />
      </Routes>
    </div>
  );
}

export default App;
