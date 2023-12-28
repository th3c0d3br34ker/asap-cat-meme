import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const API_URI = import.meta.env.VITE_API_URI;

const AddMeme = () => {
  const params = useParams();
  const navigate = useNavigate();

  const mode = params.id === 'new' ? 'CREATE' : 'EDIT';

  const [data, setData] = useState({
    name: '',
    img_url: '',
  });

  useEffect(() => {
    if (mode === 'EDIT') {
      fetch(API_URI + '/memes/' + params.id)
        .then((res) => res.json())
        .then((fetchedData) => {
          console.log(fetchedData);
          setData(fetchedData);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  }, [mode, params.id]);

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const createMeme = async () => {
    const response = await fetch(API_URI + '/memes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.status === 201) {
      setData({
        name: '',
        img_url: '',
      });

      alert('Meme added successfully!');
    }
  };

  const updateMeme = async () => {
    const response = await fetch(API_URI + '/memes/' + params.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.status === 200) {
      alert('Meme updated successfully!');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(data);

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

        <button type='submit' className='submit-button'>
          {mode === 'CREATE' ? '➕' : '✏️'} Meme
        </button>
      </form>
    </>
  );
};

export default AddMeme;
