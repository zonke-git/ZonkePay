import {Url} from './url';
import {get, post, del, put} from './methods';

export const requestOtp = async payload => {
  const url = `${Url.URL_V4}/customer/login`;
  return await post(url, payload);
};

export const verifyOtp = async (payload, token) => {
  const url = `${Url.URL_V4}/customer/otp_verify`;
  return await post(url, payload, token);
};

export const resendOtp = async payload => {
  const url = `${Url.URL_V4}/customer/resend/otp`;
  return await post(url, payload);
};

export const requestEmailOtpAPI = async (payload, token) => {
  const url = `${Url.URL_V4}/customer/send_email_otp`;
  return await post(url, payload, token);
};

export const emailotp_verifyAPI = async (payload, token) => {
  const url = `${Url.URL_V4}/customer/emailotp_verify`;
  return await post(url, payload, token);
};

export const customerVerification_API = async (payload, token) => {
  const url = `${Url.URL_V4}/customer/verification`;
  return await post(url, payload, token);
};

export const updateCustomerdetail_API = async (payload, token, id) => {
  const url = `${Url.URL_V4}/customerdetail${id ? `/${id}` : ''}`;
  return await put(url, payload, token);
};

export const getCustomerById_API = async token => {
  const url = `${Url.URL_V4}/customer`;
  return await get(url, '', token);
};

export const getwalletId_API = async (token, walletId) => {
  let url = `${Url.URL_V4}/wallet`;
  if (walletId) {
    url += `/${walletId}`;
  }
  return await get(url, '', token);
};

export const getMerchantWalletId_API = async (token, walletId) => {
  let url = `${Url.URL_V4}/merchant/wallet`;
  if (walletId) {
    url += `/${walletId}`;
  }
  return await get(url, '', token);
};

export const getWalletTransactions_API = async (
  token,
  walletId,
  type = 'credit',
) => {
  let url = `${Url.URL_V4}/wallet/audit`;
  if (walletId) {
    url += `/${walletId}`;
  }
  if (type) {
    url += `?type=${type}`;
  }
  return await get(url, '', token);
};

export const getContactNumber_API = async (token, contact_number) => {
  let url = `${Url.URL_V4}/searchbynumber`;
  if (contact_number) {
    url += `?contact_number=${contact_number}`;
  }
  return await get(url, '', token);
};

export const getBanklist_API = async token => {
  let url = `${Url.URL_V4}/banklist`;
  return await get(url, '', token);
};

export const getBankdetailsByContactNo_API = async (token, contact_number) => {
  let url = `${Url.URL_V4}/bankdetails`;
  if (contact_number) {
    url += `?contact_number=${contact_number}`;
  }
  return await get(url, '', token);
};

export const postBankdetails_API = async (payload, token) => {
  const url = `${Url.URL_V4}/bankdetails`;
  return await post(url, payload, token);
};

export const deleteBankdetails_API = async (token, id) => {
  const url = `${Url.URL_V4}/bankdetails${id ? `/${id}` : ''}`;
  return await del(url, '', token);
};

export const postWalletTopup_API = async (payload, token) => {
  let url = `${Url.URL_V4}/customer/wallet/topup`;
  return await post(url, payload, token);
};

export const getWalletTopups_API = async (payload, token) => {
  let url = `${Url.URL_V4}/wallet/topups`;
  return await post(url, payload, token);
};

export const postWalletWithdraw_API = async (payload, token) => {
  let url = `${Url.URL_V4}/customer/wallet/withdraw`;
  return await post(url, payload, token);
};

export const getWalletWithdrawals_API = async token => {
  let url = `${Url.URL_V4}/wallet/withdrawals`;
  return await get(url, '', token);
};

export const postCustomerWalletTransfer_API = async (payload, token) => {
  let url = `${Url.URL_V4}/customer/wallet/transfer`;
  return await post(url, payload, token);
};

export const postActivateCard_API = async (payload, token) => {
  let url = `${Url.URL_V4}/customer/wallet/activatecard`;
  return await post(url, payload, token);
};

export const getAccountslist_API = async token => {
  let url = `${Url.URL_V4}/accountslist`;
  return await get(url, '', token);
};

export const createMPIN_API = async (payload, token) => {
  let url = `${Url.URL_V4}/customer/mpin`;
  return await post(url, payload, token);
};

export const verifyMPIN_API = async (payload, token) => {
  let url = `${Url.URL_V4}/customer/verify/mpin`;
  return await post(url, payload, token);
};

export const forgotMPIN_API = async (payload, token) => {
  let url = `${Url.URL_V4}/customer/forgot/mpin`;
  return await post(url, payload, token);
};

export const verifyOTPMPIN_API = async (payload, token) => {
  let url = `${Url.URL_V4}/customer/verify/otp/mpin`;
  return await post(url, payload, token);
};

export const resendOTPMPIN_API = async (payload, token) => {
  let url = `${Url.URL_V4}/customer/resend/otp/mpin`;
  return await post(url, payload, token);
};
