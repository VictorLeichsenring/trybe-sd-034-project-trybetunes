import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Search from './pages/search';
import { AlbumType } from './types';
import Album from './pages/album';
import Header from './Components/Header/Header';
import Layout from './Components/layout';

function App() {
  const [albumsResult, setAlbumsResult] = useState<AlbumType[] | null>(null);

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
          <Route path="/album/:id" element={ <Album /> } />
        </Route>

      </Routes>
    </div>
  );
}

export default App;
