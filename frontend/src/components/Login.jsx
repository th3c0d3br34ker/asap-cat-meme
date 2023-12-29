import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { useEffect } from 'react';

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
    if (auth.isLoggedIn()) {
      navigate('/');
    }
  }, [auth.user]);

  return (
    <>
      <div className='top-nav'>
        <button onClick={() => navigate('/')}>🔙 Go Back</button>
      </div>

      <h1>Login</h1>

      <div className='login-container'>
        <form className='login-form' onSubmit={handleSubmit}>
          <label htmlFor='username'>Username:</label>
          <input type='text' id='username' name='username' />

          <label htmlFor='password'>Password:</label>
          <input type='password' id='password' name='password' />

          <button className='login-button' type='submit'>
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
