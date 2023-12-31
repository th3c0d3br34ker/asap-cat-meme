const API_URI = import.meta.env.VITE_API_URI;

/**
 * @typedef {Object} memeAPI
 *
 * @property {Function} list list all memes
 */
const memeAPI = {};

memeAPI.list = async () => {
  try {
    const res = await fetch(`${API_URI}/memes`);
    if (res.status !== 200) {
      const error = await res.text();
      console.error(error);
      return [];
    }

    const memes = await res.json();
    return memes;
  } catch (error) {
    console.error(error);
    return [];
  }
};

memeAPI.delete = async (id) => {
  try {
    const res = await fetch(`${API_URI}/memes/${id}`, {
      method: 'DELETE',
    });
    if (res.status !== 200) {
      const error = await res.text();
      console.error(error);
      return {};
    }

    return await res.json();
  } catch (error) {
    console.error(error);
    return {};
  }
};

memeAPI.create = async (meme) => {
  try {
    const res = await fetch(`${API_URI}/memes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(meme),
    });
    if (res.status !== 201) {
      const error = await res.text();
      console.error(error);
      return {};
    }

    return await res.json();
  } catch (error) {
    console.error(error);
    return {};
  }
}

memeAPI.update =  async (id, meme) => {
  try {
    const res = await fetch(`${API_URI}/memes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(meme),
    });
    if (res.status !== 200) {
      const error = await res.text();
      console.error(error);
      return {};
    }

    return await res.json();
  } catch (error) {
    console.error(error);
    return {};
  }
}


memeAPI.show = async (id) => {
  try {
    const res = await fetch(`${API_URI}/memes/${id}`);
    if (res.status !== 200) {
      const error = await res.text();
      console.error(error);
      return {};
    }

    return await res.json();
  } catch (error) {
    console.error(error);
    return {};
  }
}

export default memeAPI;
