import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import memeAPI from '../api/meme';
import Button from '../components/Button';

const UpsertMeme = () => {
  const params = useParams();
  const navigate = useNavigate();

  const mode = params.id === 'new' ? 'CREATE' : 'EDIT';

  const [data, setData] = useState({
    name: '',
    img_url: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (mode === 'EDIT') {
      showMeme(params.id);
    }

    if (mode === 'CREATE') {
      setLoading(false);
    }

  }, [mode, params.id]);

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const showMeme = async (id) => {
    const meme = await memeAPI.show(id);
    setData(meme);
    setLoading(false);
  }

  const createMeme = async () => {
    setLoading(true);
    const createdMeme = await memeAPI.create(data);
    setData(createdMeme);
    setLoading(false);
    alert('Meme added successfully!');
  };

  const updateMeme = async () => {
    setLoading(true);
    const updatedMeme = await memeAPI.update(params.id, data);

    setData(updatedMeme);
    setLoading(false);
    alert('Meme updated successfully!');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (mode === 'CREATE') {
      await createMeme();
    }

    if (mode === 'EDIT') {
      await updateMeme();
    }
  };

  return (
    <>
      <div className='top-nav'>
        <button onClick={() => navigate('/')}>🔙 Go Back</button>
        {mode === 'EDIT' && (
          <button onClick={() => navigate('/new')}>➕ meme</button>
        )}
      </div>

      <h1>{mode === 'CREATE' ? 'Add' : 'Edit'} Meme</h1>

      <form className='meme-form' onSubmit={handleSubmit}>
        <label htmlFor='name'>Meme Name:</label>
        <input
          id='name'
          name='name'
          value={data.name}
          onChange={handleChange}
        />

        <label htmlFor='img_url'>Image URL:</label>
        <input
          id='img_url'
          name='img_url'
          value={data.img_url}
          onChange={handleChange}
        />

        <Button type='submit' className='submit-button' loading={loading}>
          {mode === 'CREATE' ? '➕' : '✏️'} Meme
        </Button>
      </form>
    </>
  );
};

export default UpsertMeme;
