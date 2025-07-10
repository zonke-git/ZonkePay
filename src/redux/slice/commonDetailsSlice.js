import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  customerDetails_IsSubmitting: false,
  customerDetails_SubmitSuccess: false,
  customerDetails_SubmitError: null,
  customerDetails_SubmitSuccessMessage: '',
  customerDetails_SubmitErrorMessage: '',

  walletId_IsSubmitting: false,
  walletId_SubmitSuccess: false,
  walletId_SubmitError: null,
  walletId_SubmitSuccessMessage: '',
  walletId_SubmitErrorMessage: '',

  merchantWalletId_IsSubmitting: false,
  merchantWalletId_SubmitSuccess: false,
  merchantWalletId_SubmitError: null,
  merchantWalletId_SubmitSuccessMessage: '',
  merchantWalletId_SubmitErrorMessage: '',

  walletTransactions_IsSubmitting: false,
  walletTransactions_SubmitSuccess: false,
  walletTransactions_SubmitError: null,
  walletTransactions_SubmitSuccessMessage: '',
  walletTransactions_SubmitErrorMessage: '',

  contactNumber_IsSubmitting: false,
  contactNumber_SubmitSuccess: false,
  contactNumber_SubmitError: null,
  contactNumber_SubmitSuccessMessage: '',
  contactNumber_SubmitErrorMessage: '',
};

const businessProfileSlice = createSlice({
  name: 'commonDetails',
  initialState,
  reducers: {
    customerDetails_submitLoader: state => {
      state.customerDetails_IsSubmitting = true;
      state.customerDetails_SubmitSuccess = false;
      state.customerDetails_SubmitError = null;
      state.customerDetails_SubmitErrorMessage = '';
    },
    customerDetails_submitSuccess: (state, action) => {
      state.customerDetails_IsSubmitting = false;
      state.customerDetails_SubmitSuccess = true;
      state.customerDetails_SubmitSuccessMessage = action.payload;
    },
    customerDetails_submitFailure: (state, action) => {
      state.customerDetails_IsSubmitting = false;
      state.customerDetails_SubmitError = true;
      state.customerDetails_SubmitErrorMessage = action.payload;
    },
    customerDetails_submit_reset: state => {
      state.customerDetails_IsSubmitting = false;
      state.customerDetails_SubmitSuccess = false;
      state.customerDetails_SubmitError = null;
      state.customerDetails_SubmitSuccessMessage = '';
      state.customerDetails_SubmitErrorMessage = '';
    },

    walletId_submitLoader: state => {
      state.walletId_IsSubmitting = true;
      state.walletId_SubmitSuccess = false;
      state.walletId_SubmitError = null;
      state.walletId_SubmitErrorMessage = '';
    },
    walletId_submitSuccess: (state, action) => {
      state.walletId_IsSubmitting = false;
      state.walletId_SubmitSuccess = true;
      state.walletId_SubmitSuccessMessage = action.payload;
    },
    walletId_submitFailure: (state, action) => {
      state.walletId_IsSubmitting = false;
      state.walletId_SubmitError = true;
      state.walletId_SubmitErrorMessage = action.payload;
    },
    walletId_submit_reset: state => {
      state.walletId_IsSubmitting = false;
      state.walletId_SubmitSuccess = false;
      state.walletId_SubmitError = null;
      state.walletId_SubmitSuccessMessage = '';
      state.walletId_SubmitErrorMessage = '';
    },

    merchantWalletId_submitLoader: state => {
      state.merchantWalletId_IsSubmitting = true;
      state.merchantWalletId_SubmitSuccess = false;
      state.merchantWalletId_SubmitError = null;
      state.merchantWalletId_SubmitErrorMessage = '';
    },
    merchantWalletId_submitSuccess: (state, action) => {
      state.merchantWalletId_IsSubmitting = false;
      state.merchantWalletId_SubmitSuccess = true;
      state.merchantWalletId_SubmitSuccessMessage = action.payload;
    },
    merchantWalletId_submitFailure: (state, action) => {
      state.merchantWalletId_IsSubmitting = false;
      state.merchantWalletId_SubmitError = true;
      state.merchantWalletId_SubmitErrorMessage = action.payload;
    },
    merchantWalletId_submit_reset: state => {
      state.merchantWalletId_IsSubmitting = false;
      state.merchantWalletId_SubmitSuccess = false;
      state.merchantWalletId_SubmitError = null;
      state.merchantWalletId_SubmitSuccessMessage = '';
      state.merchantWalletId_SubmitErrorMessage = '';
    },

    walletTransactions_submitLoader: state => {
      state.walletTransactions_IsSubmitting = true;
      state.walletTransactions_SubmitSuccess = false;
      state.walletTransactions_SubmitError = null;
      state.walletTransactions_SubmitErrorMessage = '';
    },
    walletTransactions_submitSuccess: (state, action) => {
      state.walletTransactions_IsSubmitting = false;
      state.walletTransactions_SubmitSuccess = true;
      state.walletTransactions_SubmitSuccessMessage = action.payload;
    },
    walletTransactions_submitFailure: (state, action) => {
      state.walletTransactions_IsSubmitting = false;
      state.walletTransactions_SubmitError = true;
      state.walletTransactions_SubmitErrorMessage = action.payload;
    },
    walletTransactions_submit_reset: state => {
      state.walletTransactions_IsSubmitting = false;
      state.walletTransactions_SubmitSuccess = false;
      state.walletTransactions_SubmitError = null;
      state.walletTransactions_SubmitSuccessMessage = '';
      state.walletTransactions_SubmitErrorMessage = '';
    },

    contactNumber_submitLoader: state => {
      state.contactNumber_IsSubmitting = true;
      state.contactNumber_SubmitSuccess = false;
      state.contactNumber_SubmitError = null;
      state.contactNumber_SubmitErrorMessage = '';
    },
    contactNumber_submitSuccess: (state, action) => {
      state.contactNumber_IsSubmitting = false;
      state.contactNumber_SubmitSuccess = true;
      state.contactNumber_SubmitSuccessMessage = action.payload;
    },
    contactNumber_submitFailure: (state, action) => {
      state.contactNumber_IsSubmitting = false;
      state.contactNumber_SubmitError = true;
      state.contactNumber_SubmitErrorMessage = action.payload;
    },
    contactNumber_submit_reset: state => {
      state.contactNumber_IsSubmitting = false;
      state.contactNumber_SubmitSuccess = false;
      state.contactNumber_SubmitError = null;
      state.contactNumber_SubmitSuccessMessage = '';
      state.contactNumber_SubmitErrorMessage = '';
    },

    resetCommonDetailsForm: () => initialState,
  },
});

export const {
  resetCommonDetailsForm,

  customerDetails_submitLoader,
  customerDetails_submitSuccess,
  customerDetails_submitFailure,
  customerDetails_submit_reset,

  walletId_submitLoader,
  walletId_submitSuccess,
  walletId_submitFailure,
  walletId_submit_reset,

  merchantWalletId_submitLoader,
  merchantWalletId_submitSuccess,
  merchantWalletId_submitFailure,
  merchantWalletId_submit_reset,

  walletTransactions_submitLoader,
  walletTransactions_submitSuccess,
  walletTransactions_submitFailure,
  walletTransactions_submit_reset,

  contactNumber_submitLoader,
  contactNumber_submitSuccess,
  contactNumber_submitFailure,
  contactNumber_submit_reset,
} = businessProfileSlice.actions;

export default businessProfileSlice.reducer;
