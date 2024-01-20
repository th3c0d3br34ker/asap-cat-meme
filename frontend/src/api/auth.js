const API_URI = import.meta.env.VITE_API_URI;

// const authAPI = {
//   login: () => {},
//   verify: () => {},
//   logout: () => {},
// };

const authAPI = {};

authAPI.login = async ({ username, password }) => {
  try {
    const res = await fetch(`${API_URI}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify({ username, password }),
    });

    if (res.status !== 200) {
      const error = await res.json();
      console.error(error);
      return null;
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

authAPI.verify = async ({ token }) => {
  try {
    const res = await fetch(`${API_URI}/auth/verify`, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });

    if (res.status !== 200) {
      const error = await res.text();
      console.error(error);
      return null;
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

authAPI.logout = async () => {
  try {
    const res = await fetch(`${API_URI}/auth/logout`, {
      method: 'POST',
      credentials: 'same-origin',
    });

    if (res.status !== 200) {
      const error = await res.text();
      console.error(error);
      return null;
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default authAPI;
