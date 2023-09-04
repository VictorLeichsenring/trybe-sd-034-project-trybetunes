import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Carregandomsg from '../../Components/Carregandomsg';
import { UserType } from '../../types';
import { getUser } from '../../services/userAPI';

function Profile() {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<UserType | null>(null);
  useEffect(() => {
    async function fetchUserData() {
      const user = await getUser();
      setUserData(user);
      setIsLoading(false);
    }
    fetchUserData();
  }, []);
  return (
    <div>
      {isLoading && <Carregandomsg />}
      {!isLoading && (
        <div>
          <img src={ userData?.image } alt=" user_image" data-testid="profile-image" />
          <p>{ userData?.name }</p>
          <p>{ userData?.email }</p>
          <p>{ userData?.description }</p>
          <Link to="/profile/edit">Editar perfil</Link>
        </div>
      )}
    </div>
  );
}

export default Profile;
