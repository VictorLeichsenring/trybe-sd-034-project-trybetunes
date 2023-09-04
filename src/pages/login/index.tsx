import { useEffect, useState } from 'react';
import { createUser } from '../../services/userAPI';
import Carregandomsg from '../../Components/Carregandomsg';

function Login() {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  function nameLenght(nameValue: string) {
    return nameValue.length >= 3;
  }

  async function handleClickEntrar() {
    setIsLoading(true);
    await createUser({ name });
    setIsLoading(false);
  }

  if (isLoading) {
    return (
      <Carregandomsg />
    );
  }
  return (
    <div>
      <h1>Login Page</h1>
      <label>
        Nome:
        <input
          type="text"
          data-testid="login-name-input"
          placeholder="Insira seu Nome"
          value={ name }
          onChange={ ({ target }) => setName(target.value) }
        />
        <button
          data-testid="login-submit-button"
          disabled={ !nameLenght(name) }
          onClick={ handleClickEntrar }
        >
          Entrar
        </button>
      </label>
    </div>
  );
}

export default Login;
