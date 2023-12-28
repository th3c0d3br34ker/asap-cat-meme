import { useState } from 'react';

const API_URI = import.meta.env.VITE_API_URI;


const AddMeme = () => {
  const [data, setData] = useState({
    name: '',
    img_url: '',
  });

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

    if  (response.status === 201) {
      setData({
        name: '',
        img_url: '',
      });

      alert('Meme added successfully!');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={data.name} onChange={handleChange} />
      <input name="img_url" value={data.img_url} onChange={handleChange} />
      <button type='submit'>Add</button>
    </form>
  );
};

export default AddMeme;
