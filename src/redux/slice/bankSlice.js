import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  banklist_IsSubmitting: false,
  banklist_SubmitSuccess: false,
  banklist_SubmitError: null,
  banklist_SubmitSuccessMessage: '',
  banklist_SubmitErrorMessage: '',

  bankdetailsByContactNo_IsSubmitting: false,
  bankdetailsByContactNo_SubmitSuccess: false,
  bankdetailsByContactNo_SubmitError: null,
  bankdetailsByContactNo_SubmitSuccessMessage: '',
  bankdetailsByContactNo_SubmitErrorMessage: '',

  bankdetails_IsSubmitting: false,
  bankdetails_SubmitSuccess: false,
  bankdetails_SubmitError: null,
  bankdetails_SubmitSuccessMessage: '',
  bankdetails_SubmitErrorMessage: '',

  walletTopup_IsSubmitting: false,
  walletTopup_SubmitSuccess: false,
  walletTopup_SubmitError: null,
  walletTopup_SubmitSuccessMessage: '',
  walletTopup_SubmitErrorMessage: '',

  getWalletTopups_IsSubmitting: false,
  getWalletTopups_SubmitSuccess: false,
  getWalletTopups_SubmitError: null,
  getWalletTopups_SubmitSuccessMessage: '',
  getWalletTopups_SubmitErrorMessage: '',

  walletWithdraw_IsSubmitting: false,
  walletWithdraw_SubmitSuccess: false,
  walletWithdraw_SubmitError: null,
  walletWithdraw_SubmitSuccessMessage: '',
  walletWithdraw_SubmitErrorMessage: '',

  getWalletWithdrawals_IsSubmitting: false,
  getWalletWithdrawals_SubmitSuccess: false,
  getWalletWithdrawals_SubmitError: null,
  getWalletWithdrawals_SubmitSuccessMessage: '',
  getWalletWithdrawals_SubmitErrorMessage: '',

  customerWalletTransfer_IsSubmitting: false,
  customerWalletTransfer_SubmitSuccess: false,
  customerWalletTransfer_SubmitError: null,
  customerWalletTransfer_SubmitSuccessMessage: '',
  customerWalletTransfer_SubmitErrorMessage: '',

  activateCard_IsSubmitting: false,
  activateCard_SubmitSuccess: false,
  activateCard_SubmitError: null,
  activateCard_SubmitSuccessMessage: '',
  activateCard_SubmitErrorMessage: '',

  deleteBankdetailByID_IsSubmitting: false,
  deleteBankdetailByID_SubmitSuccess: false,
  deleteBankdetailByID_SubmitError: null,
  deleteBankdetailByID_SubmitSuccessMessage: '',
  deleteBankdetailByID_SubmitErrorMessage: '',

  getAccountslist_IsSubmitting: false,
  getAccountslist_SubmitSuccess: false,
  getAccountslist_SubmitError: null,
  getAccountslist_SubmitSuccessMessage: '',
  getAccountslist_SubmitErrorMessage: '',
};

const menuSlice = createSlice({
  name: 'bank',
  initialState,
  reducers: {
    resetBankDetailsForm: () => initialState,

    banklist_submitLoader: state => {
      state.banklist_IsSubmitting = true;
      state.banklist_SubmitSuccess = false;
      state.banklist_SubmitError = null;
      state.banklist_SubmitErrorMessage = '';
    },
    banklist_submitSuccess: (state, action) => {
      state.banklist_IsSubmitting = false;
      state.banklist_SubmitSuccess = true;
      state.banklist_SubmitSuccessMessage = action.payload;
    },
    banklist_submitFailure: (state, action) => {
      state.banklist_IsSubmitting = false;
      state.banklist_SubmitError = true;
      state.banklist_SubmitErrorMessage = action.payload;
    },
    banklist_submit_reset: state => {
      state.banklist_IsSubmitting = false;
      state.banklist_SubmitSuccess = false;
      state.banklist_SubmitError = null;
      state.banklist_SubmitSuccessMessage = '';
      state.banklist_SubmitErrorMessage = '';
    },

    bankdetailsByContactNo_submitLoader: state => {
      state.bankdetailsByContactNo_IsSubmitting = true;
      state.bankdetailsByContactNo_SubmitSuccess = false;
      state.bankdetailsByContactNo_SubmitError = null;
      state.bankdetailsByContactNo_SubmitErrorMessage = '';
    },
    bankdetailsByContactNo_submitSuccess: (state, action) => {
      state.bankdetailsByContactNo_IsSubmitting = false;
      state.bankdetailsByContactNo_SubmitSuccess = true;
      state.bankdetailsByContactNo_SubmitSuccessMessage = action.payload;
    },
    bankdetailsByContactNo_submitFailure: (state, action) => {
      state.bankdetailsByContactNo_IsSubmitting = false;
      state.bankdetailsByContactNo_SubmitError = true;
      state.bankdetailsByContactNo_SubmitErrorMessage = action.payload;
    },
    bankdetailsByContactNo_submit_reset: state => {
      state.bankdetailsByContactNo_IsSubmitting = false;
      state.bankdetailsByContactNo_SubmitSuccess = false;
      state.bankdetailsByContactNo_SubmitError = null;
      state.bankdetailsByContactNo_SubmitSuccessMessage = '';
      state.bankdetailsByContactNo_SubmitErrorMessage = '';
    },

    bankdetails_submitLoader: state => {
      state.bankdetails_IsSubmitting = true;
      state.bankdetails_SubmitSuccess = false;
      state.bankdetails_SubmitError = null;
      state.bankdetails_SubmitErrorMessage = '';
    },
    bankdetails_submitSuccess: (state, action) => {
      state.bankdetails_IsSubmitting = false;
      state.bankdetails_SubmitSuccess = true;
      state.bankdetails_SubmitSuccessMessage = action.payload;
    },
    bankdetails_submitFailure: (state, action) => {
      state.bankdetails_IsSubmitting = false;
      state.bankdetails_SubmitError = true;
      state.bankdetails_SubmitErrorMessage = action.payload;
    },
    bankdetails_submit_reset: state => {
      state.bankdetails_IsSubmitting = false;
      state.bankdetails_SubmitSuccess = false;
      state.bankdetails_SubmitError = null;
      state.bankdetails_SubmitSuccessMessage = '';
      state.bankdetails_SubmitErrorMessage = '';
    },

    walletTopup_submitLoader: state => {
      state.walletTopup_IsSubmitting = true;
      state.walletTopup_SubmitSuccess = false;
      state.walletTopup_SubmitError = null;
      state.walletTopup_SubmitErrorMessage = '';
    },
    walletTopup_submitSuccess: (state, action) => {
      state.walletTopup_IsSubmitting = false;
      state.walletTopup_SubmitSuccess = true;
      state.walletTopup_SubmitSuccessMessage = action.payload;
    },
    walletTopup_submitFailure: (state, action) => {
      state.walletTopup_IsSubmitting = false;
      state.walletTopup_SubmitError = true;
      state.walletTopup_SubmitErrorMessage = action.payload;
    },
    walletTopup_submit_reset: state => {
      state.walletTopup_IsSubmitting = false;
      state.walletTopup_SubmitSuccess = false;
      state.walletTopup_SubmitError = null;
      state.walletTopup_SubmitSuccessMessage = '';
      state.walletTopup_SubmitErrorMessage = '';
    },

    getWalletTopups_submitLoader: state => {
      state.getWalletTopups_IsSubmitting = true;
      state.getWalletTopups_SubmitSuccess = false;
      state.getWalletTopups_SubmitError = null;
      state.getWalletTopups_SubmitErrorMessage = '';
    },
    getWalletTopups_submitSuccess: (state, action) => {
      state.getWalletTopups_IsSubmitting = false;
      state.getWalletTopups_SubmitSuccess = true;
      state.getWalletTopups_SubmitSuccessMessage = action.payload;
    },
    getWalletTopups_submitFailure: (state, action) => {
      state.getWalletTopups_IsSubmitting = false;
      state.getWalletTopups_SubmitError = true;
      state.getWalletTopups_SubmitErrorMessage = action.payload;
    },
    getWalletTopups_submit_reset: state => {
      state.getWalletTopups_IsSubmitting = false;
      state.getWalletTopups_SubmitSuccess = false;
      state.getWalletTopups_SubmitError = null;
      state.getWalletTopups_SubmitSuccessMessage = '';
      state.getWalletTopups_SubmitErrorMessage = '';
    },

    walletWithdraw_submitLoader: state => {
      state.walletWithdraw_IsSubmitting = true;
      state.walletWithdraw_SubmitSuccess = false;
      state.walletWithdraw_SubmitError = null;
      state.walletWithdraw_SubmitErrorMessage = '';
    },
    walletWithdraw_submitSuccess: (state, action) => {
      state.walletWithdraw_IsSubmitting = false;
      state.walletWithdraw_SubmitSuccess = true;
      state.walletWithdraw_SubmitSuccessMessage = action.payload;
    },
    walletWithdraw_submitFailure: (state, action) => {
      state.walletWithdraw_IsSubmitting = false;
      state.walletWithdraw_SubmitError = true;
      state.walletWithdraw_SubmitErrorMessage = action.payload;
    },
    walletWithdraw_submit_reset: state => {
      state.walletWithdraw_IsSubmitting = false;
      state.walletWithdraw_SubmitSuccess = false;
      state.walletWithdraw_SubmitError = null;
      state.walletWithdraw_SubmitSuccessMessage = '';
      state.walletWithdraw_SubmitErrorMessage = '';
    },

    getWalletWithdrawals_submitLoader: state => {
      state.getWalletWithdrawals_IsSubmitting = true;
      state.getWalletWithdrawals_SubmitSuccess = false;
      state.getWalletWithdrawals_SubmitError = null;
      state.getWalletWithdrawals_SubmitErrorMessage = '';
    },
    getWalletWithdrawals_submitSuccess: (state, action) => {
      state.getWalletWithdrawals_IsSubmitting = false;
      state.getWalletWithdrawals_SubmitSuccess = true;
      state.getWalletWithdrawals_SubmitSuccessMessage = action.payload;
    },
    getWalletWithdrawals_submitFailure: (state, action) => {
      state.getWalletWithdrawals_IsSubmitting = false;
      state.getWalletWithdrawals_SubmitError = true;
      state.getWalletWithdrawals_SubmitErrorMessage = action.payload;
    },
    getWalletWithdrawals_submit_reset: state => {
      state.getWalletWithdrawals_IsSubmitting = false;
      state.getWalletWithdrawals_SubmitSuccess = false;
      state.getWalletWithdrawals_SubmitError = null;
      state.getWalletWithdrawals_SubmitSuccessMessage = '';
      state.getWalletWithdrawals_SubmitErrorMessage = '';
    },

    customerWalletTransfer_submitLoader: state => {
      state.customerWalletTransfer_IsSubmitting = true;
      state.customerWalletTransfer_SubmitSuccess = false;
      state.customerWalletTransfer_SubmitError = null;
      state.customerWalletTransfer_SubmitErrorMessage = '';
    },
    customerWalletTransfer_submitSuccess: (state, action) => {
      state.customerWalletTransfer_IsSubmitting = false;
      state.customerWalletTransfer_SubmitSuccess = true;
      state.customerWalletTransfer_SubmitSuccessMessage = action.payload;
    },
    customerWalletTransfer_submitFailure: (state, action) => {
      state.customerWalletTransfer_IsSubmitting = false;
      state.customerWalletTransfer_SubmitError = true;
      state.customerWalletTransfer_SubmitErrorMessage = action.payload;
    },
    customerWalletTransfer_submit_reset: state => {
      state.customerWalletTransfer_IsSubmitting = false;
      state.customerWalletTransfer_SubmitSuccess = false;
      state.customerWalletTransfer_SubmitError = null;
      state.customerWalletTransfer_SubmitSuccessMessage = '';
      state.customerWalletTransfer_SubmitErrorMessage = '';
    },

    activateCard_submitLoader: state => {
      state.activateCard_IsSubmitting = true;
      state.activateCard_SubmitSuccess = false;
      state.activateCard_SubmitError = null;
      state.activateCard_SubmitErrorMessage = '';
    },
    activateCard_submitSuccess: (state, action) => {
      state.activateCard_IsSubmitting = false;
      state.activateCard_SubmitSuccess = true;
      state.activateCard_SubmitSuccessMessage = action.payload;
    },
    activateCard_submitFailure: (state, action) => {
      state.activateCard_IsSubmitting = false;
      state.activateCard_SubmitError = true;
      state.activateCard_SubmitErrorMessage = action.payload;
    },
    activateCard_submit_reset: state => {
      state.activateCard_IsSubmitting = false;
      state.activateCard_SubmitSuccess = false;
      state.activateCard_SubmitError = null;
      state.activateCard_SubmitSuccessMessage = '';
      state.activateCard_SubmitErrorMessage = '';
    },

    deleteBankdetailByID_submitLoader: state => {
      state.deleteBankdetailByID_IsSubmitting = true;
      state.deleteBankdetailByID_SubmitSuccess = false;
      state.deleteBankdetailByID_SubmitError = null;
      state.deleteBankdetailByID_SubmitErrorMessage = '';
    },
    deleteBankdetailByID_submitSuccess: (state, action) => {
      state.deleteBankdetailByID_IsSubmitting = false;
      state.deleteBankdetailByID_SubmitSuccess = true;
      state.deleteBankdetailByID_SubmitSuccessMessage = action.payload;
    },
    deleteBankdetailByID_submitFailure: (state, action) => {
      state.deleteBankdetailByID_IsSubmitting = false;
      state.deleteBankdetailByID_SubmitError = true;
      state.deleteBankdetailByID_SubmitErrorMessage = action.payload;
    },
    deleteBankdetailByID_submit_reset: state => {
      state.deleteBankdetailByID_IsSubmitting = false;
      state.deleteBankdetailByID_SubmitSuccess = false;
      state.deleteBankdetailByID_SubmitError = null;
      state.deleteBankdetailByID_SubmitSuccessMessage = '';
      state.deleteBankdetailByID_SubmitErrorMessage = '';
    },

    getAccountslist_submitLoader: state => {
      state.getAccountslist_IsSubmitting = true;
      state.getAccountslist_SubmitSuccess = false;
      state.getAccountslist_SubmitError = null;
      state.getAccountslist_SubmitErrorMessage = '';
    },
    getAccountslist_submitSuccess: (state, action) => {
      state.getAccountslist_IsSubmitting = false;
      state.getAccountslist_SubmitSuccess = true;
      state.getAccountslist_SubmitSuccessMessage = action.payload;
    },
    getAccountslist_submitFailure: (state, action) => {
      state.getAccountslist_IsSubmitting = false;
      state.getAccountslist_SubmitError = true;
      state.getAccountslist_SubmitErrorMessage = action.payload;
    },
    getAccountslist_submit_reset: state => {
      state.getAccountslist_IsSubmitting = false;
      state.getAccountslist_SubmitSuccess = false;
      state.getAccountslist_SubmitError = null;
      state.getAccountslist_SubmitSuccessMessage = '';
      state.getAccountslist_SubmitErrorMessage = '';
    },
  },
});

export const {
  banklist_submitLoader,
  banklist_submitSuccess,
  banklist_submitFailure,
  banklist_submit_reset,

  bankdetailsByContactNo_submitLoader,
  bankdetailsByContactNo_submitSuccess,
  bankdetailsByContactNo_submitFailure,
  bankdetailsByContactNo_submit_reset,

  bankdetails_submitLoader,
  bankdetails_submitSuccess,
  bankdetails_submitFailure,
  bankdetails_submit_reset,

  walletTopup_submitLoader,
  walletTopup_submitSuccess,
  walletTopup_submitFailure,
  walletTopup_submit_reset,

  getWalletTopups_submitLoader,
  getWalletTopups_submitSuccess,
  getWalletTopups_submitFailure,
  getWalletTopups_submit_reset,

  walletWithdraw_submitLoader,
  walletWithdraw_submitSuccess,
  walletWithdraw_submitFailure,
  walletWithdraw_submit_reset,

  getWalletWithdrawals_submitLoader,
  getWalletWithdrawals_submitSuccess,
  getWalletWithdrawals_submitFailure,
  getWalletWithdrawals_submit_reset,

  customerWalletTransfer_submitLoader,
  customerWalletTransfer_submitSuccess,
  customerWalletTransfer_submitFailure,
  customerWalletTransfer_submit_reset,

  activateCard_submitLoader,
  activateCard_submitSuccess,
  activateCard_submitFailure,
  activateCard_submit_reset,

  deleteBankdetailByID_submitLoader,
  deleteBankdetailByID_submitSuccess,
  deleteBankdetailByID_submitFailure,
  deleteBankdetailByID_submit_reset,

  getAccountslist_submitLoader,
  getAccountslist_submitSuccess,
  getAccountslist_submitFailure,
  getAccountslist_submit_reset,

  resetBankDetailsForm,
} = menuSlice.actions;

export default menuSlice.reducer;
