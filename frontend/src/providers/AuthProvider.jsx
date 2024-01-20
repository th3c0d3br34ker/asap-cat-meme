import { useEffect, useState } from 'react';

import authAPI from '../api/auth';
import storageAPI from '../utils/storage';
import { AuthContext } from '../hooks/useAuth';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to handle user login
  const login = async (username, password) => {
    try {
      const authenticatedUser = await authAPI.login({ username, password });
      storageAPI.set('user', authenticatedUser);
      setUser(authenticatedUser);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  // Function to handle user verification
  const verify = async (user) => {
    try {
      const verifiedUser = await authAPI.verify(user);
      storageAPI.set('user', verifiedUser);
      setUser(verifiedUser);
      setLoading(false);
    } catch (error) {
      console.error('Verification failed:', error);
      setLoading(false);
    }
  };

  // Function to handle user logout
  const logout = async () => {
    try {
      await authAPI.verify(user);
      storageAPI.remove('user');
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Check if a user is already authenticated on component mount
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const user = storageAPI.get('user');

        if (user) {
          await verify(user);
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        setLoading(false);
      }
    };

    checkAuthentication();
  }, []);

  const value = {
    user,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
