import { useEffect, useState } from 'react';

const storageAPI = {
  set: () => {},
  get: () => {},
  remove: () => {},
};

// Mock sessionStorage
storageAPI.set = (key, value) => {
  sessionStorage.setItem(key, JSON.stringify(value));

  return value;
};

storageAPI.get = (key) => {
  const value = sessionStorage.getItem(key);

  return value && JSON.parse(value);
};

storageAPI.remove = (key) => {
  sessionStorage.removeItem(key);
};

const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = storageAPI.get('user');

    if (user) {
      setUser(user);
    }

  }, []);

  const login = (username, password) => {
    const user = { username, password };

    storageAPI.set('user', user);
    setUser(user);
  };

  const logout = () => {
    storageAPI.remove('user');
    setUser(null);
  };

  const isLoggedIn = () => {
    
    return !!storageAPI.get('user');
  };

  return {
    user,
    login,
    logout,
    isLoggedIn,
  };
};

export default useAuth;
