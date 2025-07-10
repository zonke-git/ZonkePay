import {
  getContactNumber_API,
  getCustomerById_API,
  getMerchantWalletId_API,
  getwalletId_API,
  getWalletTransactions_API,
} from '../../api/api';
import {
  contactNumber_submitFailure,
  contactNumber_submitLoader,
  contactNumber_submitSuccess,
  customerDetails_submitFailure,
  customerDetails_submitLoader,
  customerDetails_submitSuccess,
  merchantWalletId_submitFailure,
  merchantWalletId_submitLoader,
  merchantWalletId_submitSuccess,
  walletId_submitFailure,
  walletId_submitLoader,
  walletId_submitSuccess,
  walletTransactions_submitFailure,
  walletTransactions_submitLoader,
  walletTransactions_submitSuccess,
} from '../slice/commonDetailsSlice';

export const customerDetailsByID = token => async dispatch => {
  try {
    dispatch(customerDetails_submitLoader());
    const response = await getCustomerById_API(token);
    console.log('common Details Form Response :', response);
    dispatch(customerDetails_submitSuccess(response || 'Success'));
    return response;
  } catch (error) {
    console.log('common Details Form Error :', error);
    dispatch(customerDetails_submitFailure(error || 'Submission failed'));
    throw error;
  }
};

export const getwalletId = (token, walletId) => async dispatch => {
  try {
    dispatch(walletId_submitLoader());
    const response = await getwalletId_API(token, walletId);
    console.log('wallet Id Response :', response);
    dispatch(walletId_submitSuccess(response || 'Success'));
    return response;
  } catch (error) {
    console.log('wallet Id  Error :', error);
    dispatch(walletId_submitFailure(error || 'Submission failed'));
    throw error;
  }
};

export const getMerchantWalletId = (token, walletId) => async dispatch => {
  try {
    dispatch(merchantWalletId_submitLoader());
    const response = await getMerchantWalletId_API(token, walletId);
    console.log('merchant wallet Id Response :', response);
    dispatch(merchantWalletId_submitSuccess(response || 'Success'));
    return response;
  } catch (error) {
    console.log('merchant wallet Id  Error :', error);
    dispatch(merchantWalletId_submitFailure(error || 'Submission failed'));
    throw error;
  }
};

export const getWalletTransactions =
  (token, walletId, type) => async dispatch => {
    try {
      dispatch(walletTransactions_submitLoader());
      const response = await getWalletTransactions_API(token, walletId, type);
      console.log('wallet Transactions Response :', response);
      dispatch(walletTransactions_submitSuccess(response || 'Success'));
      return response;
    } catch (error) {
      console.log('wallet Transactions  Error :', error);
      dispatch(walletTransactions_submitFailure(error || 'Submission failed'));
      throw error;
    }
  };

export const getContactNumber = (token, walletId, type) => async dispatch => {
  try {
    dispatch(contactNumber_submitLoader());
    const response = await getContactNumber_API(token, walletId, type);
    console.log('Contact Number Response :', response);
    dispatch(contactNumber_submitSuccess(response || 'Success'));
    return response;
  } catch (error) {
    console.log('Contact Number  Error :', error);
    dispatch(contactNumber_submitFailure(error || 'Submission failed'));
    throw error;
  }
};
