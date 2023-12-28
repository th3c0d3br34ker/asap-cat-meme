import { useEffect, useState } from 'react';
import './App.css';
import Meme from './components/Meme';
import { useNavigate } from 'react-router-dom';

const API_URI = import.meta.env.VITE_API_URI;

function App() {
  const navigate = useNavigate();
  const [memes, setMemes] = useState([]);

  useEffect(() => {
    fetch(API_URI + '/memes')
      .then((res) => res.json())
      .then((memes) => {
        setMemes(memes);
      })
      .catch((err) => {
        console.error(err);
        setMemes([]);
      });
  }, []);


  const handleDelete = async (id) => {
    const response = await fetch(API_URI + '/memes/' + id, {
      method: 'DELETE',
    });

    if (response.status === 200) {
      setMemes(memes.filter((meme) => meme._id !== id));
      alert('Meme deleted successfully!');
    }
  }

  return (
    <>
      <div>
        <h1>Memer</h1>
        <h2>Make your own memes!</h2>
        <button onClick={() => navigate('/new')}>Add a meme</button>
      </div>
      <hr />
      <div className='wrapper'>
        {memes.map((meme) => (
          <Meme key={meme._id} {...meme} handleDelete={handleDelete} />
        ))}
      </div>
    </>
  );
}

export default App;
