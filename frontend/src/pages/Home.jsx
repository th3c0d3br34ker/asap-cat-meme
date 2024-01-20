import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Meme from '../components/Meme';
import { useAuth } from '../hooks/useAuth';
import memeAPI from '../api/meme';

function Home() {
  const auth = useAuth();
  const navigate = useNavigate();

  const [memes, setMemes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (auth.user) {
      memeAPI.list().then((memes) => {
        setMemes(memes);
        setLoading(false);
      });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!auth.user) {
      navigate('/login');
    }
  }, [auth.user]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleDelete = async (id) => {
    await memeAPI.delete(id);
    setMemes(memes.filter((meme) => meme._id !== id));
  };

  return (
    <>
      <h1>^_^</h1>
      <h2>Make your own memes!</h2>

      <div className='meme-list-wrapper'>
        {loading && <p>⌛ Loading...</p>}
        {memes.map((meme) => (
          <Meme key={meme._id} {...meme} handleDelete={handleDelete} />
        ))}
      </div>
    </>
  );
}

export default Home;
