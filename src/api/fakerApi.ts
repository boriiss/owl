import axios from 'axios';

const BASE_URL = 'https://fakerapi.it/api/v2';

export const fakerApi = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

export const getProducts = async (page = 1, limit = 10) => {
  const response = await fakerApi.get('/products', {
    params: {
      _quantity: limit,
      _page: page,
    },
  });
  return response.data.data;
};

export const getProductById = async (id: number) => {
  const response = await fakerApi.get('/products', {
    params: {
      _quantity: 1,
      id,
    },
  });
  return response.data.data[0];
};

export const getCurrentUser = async () => {
  const response = await fakerApi.get('/persons', {
    params: {
      _quantity: 1,
    },
  });
  return response.data.data[0];
};