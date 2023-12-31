import { useEffect, useState } from 'react';
import Meme from '../components/Meme';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import memeAPI from '../api/meme';

function Home() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [memes, setMemes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (auth.isLoggedIn()) {
      memeAPI.list().then((memes) => {
        setMemes(memes);
        setLoading(false);
      });
    } else {
      navigate('/login');
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleDelete = async (id) => {
    await memeAPI.delete(id);
    setMemes(memes.filter((meme) => meme._id !== id));
  };

  return (
    <>
      <div>
        <h1>U_U</h1>
        <h2>Make your own memes!</h2>
        <button onClick={() => navigate('/new')}>➕ Add a meme</button>
      </div>
      <hr />
      <div className='wrapper'>
        {loading && <p>⌛ Loading...</p>}
        {memes.map((meme) => (
          <Meme key={meme._id} {...meme} handleDelete={handleDelete} />
        ))}
      </div>
    </>
  );
}

export default Home;
