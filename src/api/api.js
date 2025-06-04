import {Url} from './url';
import {get, post, del} from './methods';

export const requestOtp = async payload => {
  const url = `${Url.URL_V4}merchant/requestOtp`;
  return await post(url, payload);
};

export const verifyOtp = async payload => {
  const url = `${Url.URL_V4}merchant/verifyOtp`;
  return await post(url, payload);
};

export const getBusinessCategories = async userId => {
  const url = `${Url.URL_V4}getCategories`;
  return await get(url);
};

// Add more APIs here
export const deleteUser = async userId => {
  const url = `${Url.URL_V4}deleteUser/${userId}`;
  return await del(url);
};
