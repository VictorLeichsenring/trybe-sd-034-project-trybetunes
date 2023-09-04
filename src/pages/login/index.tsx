import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { createUser } from '../../services/userAPI';
import Carregandomsg from '../../Components/Carregandomsg';

function Login() {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  function nameLenght(nameValue: string) {
    return nameValue.length >= 3;
  }

  async function handleClickEntrar(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    await createUser({ name });
    setIsLoading(false);
    navigate('/search');
  }

  if (isLoading) {
    return (
      <Carregandomsg />
    );
  }
  return (
    <form onSubmit={ handleClickEntrar }>
      <h1>Login Page</h1>
      <label>
        Nome:
        <input
          type="text"
          data-testid="login-name-input"
          placeholder="Insira seu Nome"
          value={ name }
          onChange={ ({ target: { value } }) => setName(value) }
        />
        <button
          data-testid="login-submit-button"
          disabled={ !nameLenght(name) }
        >
          Entrar
        </button>
      </label>
    </form>
  );
}

export default Login;
