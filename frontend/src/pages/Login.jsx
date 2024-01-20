import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';

const Login = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();

    const username = e.target.username.value;
    const password = e.target.password.value;

    auth.login(username, password);
  };

  useEffect(() => {
    if (auth.user) {
      navigate('/');
    }
  }, [auth.user]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className='auth-wrapper'>
      <h1 className='auth-header'>Login</h1>

      <div className='login-container'>
        <form className='login-form' onSubmit={handleSubmit}>
          <label htmlFor='username'>Username:</label>
          <input type='text' id='username' name='username' />

          <label htmlFor='password'>Password:</label>
          <input type='password' id='password' name='password' />

          <button className='login-button' type='submit'>
            👤 Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
