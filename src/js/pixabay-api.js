import axios from 'axios';

export const requestPixabay = async (searchText, addParams) => {
  const response = await axios.get('https://pixabay.com/api/', {
    params: {
      key: '49158274-90b67010582f237611193f20c',
      q: searchText,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      ...addParams,
    },
  });
  return response.data;
};
