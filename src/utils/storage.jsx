
export const saveToStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const loadFromStorage = (key) => {
  const val = localStorage.getItem(key);
  return val ? JSON.parse(val) : null;
};
