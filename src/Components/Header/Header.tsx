import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getUser } from '../../services/userAPI';
import Carregandomsg from '../Carregandomsg';

function Header() {
  const [userName, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  async function fetchUser() {
    const user = await getUser();
    const { name } = user;
    setUserName(name);
    setIsLoading(false);
  }
  fetchUser();
  return (
    <header data-testid="header-component">
      { isLoading && <Carregandomsg /> }
      <p data-testid="header-user-name">{userName}</p>
      <NavLink to="/search" data-testid="link-to-search">Search</NavLink>
      <NavLink to="/favorites" data-testid="link-to-favorites">Favorites</NavLink>
      <NavLink to="/profile" data-testid="link-to-profile">Profile</NavLink>
    </header>
  );
}
export default Header;
