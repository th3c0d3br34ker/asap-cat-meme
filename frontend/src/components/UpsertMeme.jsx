import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const API_URI = import.meta.env.VITE_API_URI;

const AddMeme = () => {
  const params = useParams();

  const mode = params.id === 'new' ? 'CREATE' : 'EDIT';

  const [data, setData] = useState({
    name: '',
    img_url: '',
  });

  useEffect(() => {
    if (mode === 'EDIT') {
      fetch(API_URI + '/data/' + params.id)
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(data);

    const response = await fetch(API_URI + '/data', {
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

  return (
    <form className='meme-form' onSubmit={handleSubmit}>
      <label htmlFor='name'>Meme Name:</label>
      <input id='name' name='name' value={data.name} onChange={handleChange} />

      <label htmlFor='img_url'>Image URL:</label>
      <input
        id='img_url'
        name='img_url'
        value={data.img_url}
        onChange={handleChange}
      />

      <button type='submit' className='submit-button'>
        {mode === 'CREATE' ? 'Add Meme' : 'Edit Meme'}
      </button>
    </form>
  );
};

export default AddMeme;
