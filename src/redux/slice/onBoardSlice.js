import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  customerDetails: {
    type: 'MERCHANT',
    type_: {id: 2, name: 'MERCHANT'},
    saId: '0101310000080',
    // type: '',
    // saId: '',
  },

  updateOnBoardDetail: {
    firstName: '',
    lastName: '',
    nickname: '',
    email: '',
    PhoneNumber: '',
    location: '',
    location_name: '',
    referralCode: '',
    termsAndConditions_PrivacyPolicyCheckBox: false,
  },

  updateOnBoardDetail_IsSubmitting: false,
  updateOnBoardDetail_SubmitSuccess: false,
  updateOnBoardDetail_SubmitError: null,
  updateOnBoardDetail_SubmitSuccessMessage: '',
  updateOnBoardDetail_SubmitErrorMessage: '',

  customerVerification_IsSubmitting: false,
  customerVerification_SubmitSuccess: false,
  customerVerification_SubmitError: null,
  customerVerification_SubmitSuccessMessage: '',
  customerVerification_SubmitErrorMessage: '',
};

const onBoardSlice = createSlice({
  name: 'onBoard',
  initialState,
  reducers: {
    resetOnBoardForm: () => initialState,

    setCustomerDetails: (state, action) => {
      state.customerDetails = {...state.customerDetails, ...action.payload};
    },

    resetupdateOnBoardDetail: state => {
      state.updateOnBoardDetail = {
        firstName: '',
        lastName: '',
        nickname: '',
        email: '',
        PhoneNumber: '',
        location: '',
        location_name: '',
        referralCode: '',
        termsAndConditions_PrivacyPolicyCheckBox: false,
        CIPCRegistrationNumber: '',
      };
    },

    setupdateOnBoardDetail: (state, action) => {
      state.updateOnBoardDetail = {...state.updateOnBoardDetail, ...action.payload};
    },

    updateOnBoardDetail_Loader: state => {
      state.updateOnBoardDetail_IsSubmitting = true;
      state.updateOnBoardDetail_SubmitSuccess = false;
      state.updateOnBoardDetail_SubmitError = null;
      state.updateOnBoardDetail_SubmitErrorMessage = '';
    },
    updateOnBoardDetail_Success: (state, action) => {
      state.updateOnBoardDetail_IsSubmitting = false;
      state.updateOnBoardDetail_SubmitSuccess = true;
      state.updateOnBoardDetail_SubmitSuccessMessage = action.payload;
    },
    updateOnBoardDetail_Failure: (state, action) => {
      state.updateOnBoardDetail_IsSubmitting = false;
      state.updateOnBoardDetail_SubmitError = true;
      state.updateOnBoardDetail_SubmitErrorMessage = action.payload;
    },

    updateOnBoardDetail_Reset: state => {
      state.updateOnBoardDetail_IsSubmitting = false;
      state.updateOnBoardDetail_SubmitSuccess = false;
      state.updateOnBoardDetail_SubmitError = null;
      state.updateOnBoardDetail_SubmitSuccessMessage = '';
      state.updateOnBoardDetail_SubmitErrorMessage = '';
    },

    customerVerification_submitLoader: state => {
      state.customerVerification_IsSubmitting = true;
      state.customerVerification_SubmitSuccess = false;
      state.customerVerification_SubmitError = null;
      state.customerVerification_SubmitErrorMessage = '';
    },
    customerVerification_submitSuccess: (state, action) => {
      state.customerVerification_IsSubmitting = false;
      state.customerVerification_SubmitSuccess = true;
      state.customerVerification_SubmitSuccessMessage = action.payload;
    },
    customerVerification_submitFailure: (state, action) => {
      state.customerVerification_IsSubmitting = false;
      state.customerVerification_SubmitError = true;
      state.customerVerification_SubmitErrorMessage = action.payload;
    },
    customerVerification_submit_reset: state => {
      state.customerVerification_IsSubmitting = false;
      state.customerVerification_SubmitSuccess = false;
      state.customerVerification_SubmitError = null;
      state.customerVerification_SubmitSuccessMessage = '';
      state.customerVerification_SubmitErrorMessage = '';
    },
  },
});

export const {
  resetOnBoardForm,

  setCustomerDetails,

  resetupdateOnBoardDetail,
  setupdateOnBoardDetail,

  updateOnBoardDetail_Loader,
  updateOnBoardDetail_Success,
  updateOnBoardDetail_Failure,
  updateOnBoardDetail_Reset,

  customerVerification_submitLoader,
  customerVerification_submitSuccess,
  customerVerification_submitFailure,
  customerVerification_submit_reset,
} = onBoardSlice.actions;

export default onBoardSlice.reducer;
