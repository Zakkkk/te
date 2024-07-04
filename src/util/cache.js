const cache = {
  get: name => {
    return JSON.parse(localStorage.getItem(name));
  },
  set: (name, value) => {
    localStorage.setItem(name, JSON.stringify(value));
  }
};

export default cache;