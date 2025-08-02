export const getStorageValue = (key: string, defaultValue: string) => {
  const saved = localStorage.getItem(key);
  return saved || defaultValue;
};
