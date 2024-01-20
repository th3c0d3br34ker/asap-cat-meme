import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const catEmojis = ['😺', '😸', '😹', '😻', '😼', '😽', '🙀', '😿', '😾', '🐱'];

const getRandomIdx = () => Math.floor(Math.random() * catEmojis.length);

const Navbar = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [currentEmoji, setCurrentEmoji] = useState(catEmojis[getRandomIdx()]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentEmoji(catEmojis[getRandomIdx()]);
    }, 3800);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className='navbar'>
      <span className='emoji'>{currentEmoji}</span>

      {auth.user && (
        <div>
          <button onClick={() => navigate('/new')}>➕ Add a meme</button>
          <button onClick={() => auth.logout()}>👤 Log Out</button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
