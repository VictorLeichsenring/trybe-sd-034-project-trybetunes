import { Routes, Route } from 'react-router-dom';
import Login from './pages/login';

function App() {
  return (
    <div>
      <p>Trybetunes</p>
      <Routes>
        <Route path="/" element={ <Login /> }>Login</Route>
      </Routes>
    </div>
  );
}

export default App;
