import {
  deleteBankdetails_API,
  getAccountslist_API,
  getBankdetailsByContactNo_API,
  getBanklist_API,
  getWalletTopups_API,
  getWalletWithdrawals_API,
  postActivateCard_API,
  postBankdetails_API,
  postCustomerWalletTransfer_API,
  postWalletTopup_API,
  postWalletWithdraw_API,
} from '../../api/api';
import {
  activateCard_submitFailure,
  activateCard_submitLoader,
  activateCard_submitSuccess,
  bankdetails_submitFailure,
  bankdetails_submitLoader,
  bankdetails_submitSuccess,
  bankdetailsByContactNo_submitFailure,
  bankdetailsByContactNo_submitLoader,
  bankdetailsByContactNo_submitSuccess,
  banklist_submitFailure,
  banklist_submitLoader,
  banklist_submitSuccess,
  customerWalletTransfer_submitFailure,
  customerWalletTransfer_submitLoader,
  customerWalletTransfer_submitSuccess,
  deleteBankdetailByID_submitFailure,
  deleteBankdetailByID_submitLoader,
  deleteBankdetailByID_submitSuccess,
  getAccountslist_submitFailure,
  getAccountslist_submitLoader,
  getAccountslist_submitSuccess,
  getWalletTopups_submitFailure,
  getWalletTopups_submitLoader,
  getWalletTopups_submitSuccess,
  getWalletWithdrawals_submitFailure,
  getWalletWithdrawals_submitLoader,
  getWalletWithdrawals_submitSuccess,
  walletTopup_submitFailure,
  walletTopup_submitLoader,
  walletTopup_submitSuccess,
  walletWithdraw_submitFailure,
  walletWithdraw_submitLoader,
  walletWithdraw_submitSuccess,
} from '../slice/bankSlice';

export const getBanklist = (payload, toke) => async dispatch => {
  try {
    dispatch(banklist_submitLoader());
    const response = await getBanklist_API(payload, toke);
    console.log('Bank List Response :', response);
    dispatch(banklist_submitSuccess(response));
    return response;
  } catch (error) {
    console.log('Bank List Error :', error);
    dispatch(banklist_submitFailure(error.message || 'API Failed'));
    throw error;
  }
};

export const bankdetailsByContactNo = (payload, toke) => async dispatch => {
  try {
    dispatch(bankdetailsByContactNo_submitLoader());
    const response = await getBankdetailsByContactNo_API(payload, toke);
    console.log('Bank Details By Contact No Response :', response);
    dispatch(bankdetailsByContactNo_submitSuccess(response));
    return response;
  } catch (error) {
    console.log('Bank Details By Contact No Error :', error);
    dispatch(
      bankdetailsByContactNo_submitFailure(error.message || 'API Failed'),
    );
    throw error;
  }
};

export const bankdetails = (payload, toke) => async dispatch => {
  try {
    dispatch(bankdetails_submitLoader());
    const response = await postBankdetails_API(payload, toke);
    console.log('Bank Details Response :', response);
    dispatch(bankdetails_submitSuccess(response));
    return response;
  } catch (error) {
    console.log('Bank Details Error :', error);
    dispatch(bankdetails_submitFailure(error.message || 'API Failed'));
    throw error;
  }
};

export const walletTopup = (payload, toke) => async dispatch => {
  try {
    dispatch(walletTopup_submitLoader());
    const response = await postWalletTopup_API(payload, toke);
    console.log('Wallet Topup Response :', response);
    dispatch(walletTopup_submitSuccess(response));
    return response;
  } catch (error) {
    console.log('Wallet Topup Error :', error);
    dispatch(walletTopup_submitFailure(error.message || 'API Failed'));
    throw error;
  }
};

export const getWalletTopups = (payload, toke) => async dispatch => {
  try {
    dispatch(getWalletTopups_submitLoader());
    const response = await getWalletTopups_API(payload, toke);
    console.log('Get Wallet Topups Response :', response);
    dispatch(getWalletTopups_submitSuccess(response));
    return response;
  } catch (error) {
    console.log('Get Wallet Topups Error :', error);
    dispatch(getWalletTopups_submitFailure(error.message || 'API Failed'));
    throw error;
  }
};

export const walletWithdraw = (payload, toke) => async dispatch => {
  try {
    dispatch(walletWithdraw_submitLoader());
    const response = await postWalletWithdraw_API(payload, toke);
    console.log('Wallet Withdraw Response :', response);
    dispatch(walletWithdraw_submitSuccess(response));
    return response;
  } catch (error) {
    console.log('Wallet Withdraw Error :', error);
    dispatch(walletWithdraw_submitFailure(error.message || 'API Failed'));
    throw error;
  }
};

export const getWalletWithdrawals = (payload, toke) => async dispatch => {
  try {
    dispatch(getWalletWithdrawals_submitLoader());
    const response = await getWalletWithdrawals_API(payload, toke);
    console.log('Get Wallet Withdraws Response :', response);
    dispatch(getWalletWithdrawals_submitSuccess(response));
    return response;
  } catch (error) {
    console.log('Get Wallet Withdraws Error :', error);
    dispatch(getWalletWithdrawals_submitFailure(error.message || 'API Failed'));
    throw error;
  }
};

export const customerWalletTransfer = (payload, toke) => async dispatch => {
  try {
    dispatch(customerWalletTransfer_submitLoader());
    const response = await postCustomerWalletTransfer_API(payload, toke);
    console.log('customer Wallet Transfer Response :', response);
    dispatch(customerWalletTransfer_submitSuccess(response));
    return response;
  } catch (error) {
    console.log('customer Wallet Transfer Error :', error);
    dispatch(
      customerWalletTransfer_submitFailure(error.message || 'API Failed'),
    );
    throw error;
  }
};

export const activateCard = (payload, toke) => async dispatch => {
  try {
    dispatch(activateCard_submitLoader());
    const response = await postActivateCard_API(payload, toke);
    console.log('customer Wallet Activate Card Response :', response);
    dispatch(activateCard_submitSuccess(response));
    return response;
  } catch (error) {
    console.log('customer Wallet Activate Card Error :', error);
    dispatch(activateCard_submitFailure(error.message || 'API Failed'));
    throw error;
  }
};

export const deleteBankdetailByID = (payload, toke) => async dispatch => {
  try {
    dispatch(deleteBankdetailByID_submitLoader());
    const response = await deleteBankdetails_API(payload, toke);
    console.log('Delete Bank Betail By ID Response :', response);
    dispatch(deleteBankdetailByID_submitSuccess(response));
    return response;
  } catch (error) {
    console.log('Delete Bank Betail By ID Error :', error);
    dispatch(deleteBankdetailByID_submitFailure(error.message || 'API Failed'));
    throw error;
  }
};

export const getAccountslist = (payload, toke) => async dispatch => {
  try {
    dispatch(getAccountslist_submitLoader());
    const response = await getAccountslist_API(payload, toke);
    console.log('Get Accounts List Response :', response);
    dispatch(getAccountslist_submitSuccess(response));
    return response;
  } catch (error) {
    console.log('Get Accounts List Error :', error);
    dispatch(getAccountslist_submitFailure(error.message || 'API Failed'));
    throw error;
  }
};
