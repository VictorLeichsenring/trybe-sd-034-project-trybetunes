import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Carregandomsg from '../../Components/Carregandomsg';
import { getUser, updateUser } from '../../services/userAPI';
import { UserType } from '../../types';

function ProfileEdit() {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<UserType | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUserData() {
      const user = await getUser();
      setUserData(user);
      setIsLoading(false);
    }
    fetchUserData();
  }, []);

  const handleNameChange = (name: string) => {
    if (userData) {
      setUserData((prevUserData) => {
        if (!prevUserData) return null;
        return { ...prevUserData, name };
      });
    }
  };

  const handleEmailChange = (email: string) => {
    if (userData) {
      setUserData((prevUserData) => {
        if (!prevUserData) return null;
        return { ...prevUserData, email };
      });
    }
  };

  const handleDescriptionChange = (description: string) => {
    if (userData) {
      setUserData((prevUserData) => {
        if (!prevUserData) return null;
        return { ...prevUserData, description };
      });
    }
  };

  const handleImageChange = (image: string) => {
    if (userData) {
      setUserData((prevUserData) => {
        if (!prevUserData) return null;
        return { ...prevUserData, image };
      });
    }
  };

  const isEmailValid = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSave = async () => {
    if (userData) {
      setIsLoading(true);
      await updateUser(userData);
      setIsLoading(false);
      navigate('/profile');
    }
  };

  const allFieldsFilled = userData
  && userData.name
  && isEmailValid(userData.email)
  && userData.description
  && userData.image;

  return (
    <div>
      {isLoading && <Carregandomsg />}
      {!isLoading && (
        <form>
          <label>
            Nome
            <input
              type="text"
              data-testid="edit-input-name"
              value={ userData?.name }
              onChange={ ({ target: { value } }) => handleNameChange(value) }
            />
          </label>
          <label>
            Email
            <input
              type="email"
              data-testid="edit-input-email"
              value={ userData?.email }
              onChange={ ({ target: { value } }) => handleEmailChange(value) }
            />
          </label>
          <label>
            Descrição
            <textarea
              data-testid="edit-input-description"
              value={ userData?.description }
              onChange={ ({ target: { value } }) => handleDescriptionChange(value) }
            />
          </label>
          <label>
            Imagem
            <input
              type="text"
              data-testid="edit-input-image"
              value={ userData?.image }
              onChange={ ({ target: { value } }) => handleImageChange(value) }
            />
          </label>
          <button
            data-testid="edit-button-save"
            onClick={ handleSave }
            disabled={ !allFieldsFilled }
          >
            Salvar
          </button>
        </form>
      )}
    </div>
  );
}

export default ProfileEdit;
