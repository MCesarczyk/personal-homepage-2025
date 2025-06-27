export const localStorageService = {
  getItem: (key: string) => {
    const item = localStorage.getItem(key);
    if (item && item !== "undefined") {
      return JSON.parse(item);
    }
    return null;
  },

  setItem: <T>(key: string, value: T) => {
    localStorage.setItem(key, JSON.stringify(value));
  },

  removeItem: (key: string) => {
    localStorage.removeItem(key);
  },
};
