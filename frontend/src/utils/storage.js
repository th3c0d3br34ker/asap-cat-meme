// const storageAPI = {
//   set: (key, value) => {}, // eslint-disable-line no-unused-vars
//   get: (key) => {}, // eslint-disable-line no-unused-vars
//   remove: () => {},
// };

const localStorageAPI = {
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  },
  get: (key, ) => {
    try {
      const value = localStorage.getItem(key);
      if (value) return JSON.parse(value);
    } catch (error) {
      return null;
    }
  },
  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(error);
    }
  },
};

export default localStorageAPI;
