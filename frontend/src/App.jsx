import { useEffect, useState } from 'react';
import './App.css';
import Meme from './components/Meme';

const API_URI = import.meta.env.VITE_API_URI;

function App() {
  const [memes, setMemes] = useState([]);

  useEffect(() => {
    fetch(API_URI + '/data')
      .then((res) => res.json())
      .then((memes) => {
        setMemes(memes);
      })
      .catch((err) => {
        console.error(err);
        setMemes([]);
      });
  }, []);

  return (
    <div className='wrapper'>
      {memes.map((meme) => (
        <Meme key={meme._id} {...meme} />
      ))}
    </div>
  );
}

export default App;
