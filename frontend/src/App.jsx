import './App.css';
import Meme from './components/Meme';

const meme = {
  name: 'rizz_cat',
  img_url:
    'https://i.pinimg.com/originals/14/58/8f/14588fa9aca2fab5d79c95b49e4ed830.jpg',
};

function App() {
  return (
    <>
      <Meme {...meme} />
    </>
  );
}

export default App;
