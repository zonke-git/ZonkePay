import axios from 'axios';

const headers = {
  'Content-Type': 'application/json',
};

export const get = async (url, params = {}) => {
  try {
    const response = await axios.get(url, {params, headers});
    return response.data;
  } catch (err) {
    console.error('GET Error:', err);
    throw err?.response?.data || err.message;
  }
};

export const post = async (url, payload = {}) => {
  try {
    const response = await axios.post(url, payload, {headers});
    return response.data;
  } catch (err) {
    console.error('POST Error:', err);
    throw err?.response?.data || err.message;
  }
};

export const del = async (url, payload = {}) => {
  try {
    const response = await axios.delete(url, {data: payload, headers});
    return response.data;
  } catch (err) {
    console.error('DELETE Error:', err);
    throw err?.response?.data || err.message;
  }
};
