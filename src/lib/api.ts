const getApiUrl = (path: string) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  return {
    url: `${apiUrl}${path}`,
    options: {
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    }
  };
};

export default getApiUrl;