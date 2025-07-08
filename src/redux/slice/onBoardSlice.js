import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  onBoardDetails: {
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
    // CIPCRegistrationNumber: '1962/000738/06',
  },

  onBoardDetails_IsSubmitting: false,
  onBoardDetails_SubmitSuccess: false,
  onBoardDetails_SubmitError: null,
  onBoardDetails_SubmitSuccessMessage: '',
  onBoardDetails_SubmitErrorMessage: '',
};

const onBoardSlice = createSlice({
  name: 'onBoard',
  initialState,
  reducers: {
    resetOnBoardForm: () => initialState,

    resetOnBoardDetails: state => {
      state.onBoardDetails = {
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

    setOnBoardDetails: (state, action) => {
      state.onBoardDetails = {...state.onBoardDetails, ...action.payload};
    },

    onBoardDetails_Loader: state => {
      state.onBoardDetails_IsSubmitting = true;
      state.onBoardDetails_SubmitSuccess = false;
      state.onBoardDetails_SubmitError = null;
      state.onBoardDetails_SubmitErrorMessage = '';
    },
    onBoardDetails_Success: (state, action) => {
      state.onBoardDetails_IsSubmitting = false;
      state.onBoardDetails_SubmitSuccess = true;
      state.onBoardDetails_SubmitSuccessMessage = action.payload;
    },
    onBoardDetails_Failure: (state, action) => {
      state.onBoardDetails_IsSubmitting = false;
      state.onBoardDetails_SubmitError = true;
      state.onBoardDetails_SubmitErrorMessage = action.payload;
    },

    onBoardDetails_Reset: state => {
      state.onBoardDetails_IsSubmitting = false;
      state.onBoardDetails_SubmitSuccess = false;
      state.onBoardDetails_SubmitError = null;
      state.onBoardDetails_SubmitSuccessMessage = '';
      state.onBoardDetails_SubmitErrorMessage = '';
    },
  },
});

export const {
  resetOnBoardForm,
  resetOnBoardDetails,
  setOnBoardDetails,
  onBoardDetails_Loader,
  onBoardDetails_Success,
  onBoardDetails_Failure,
  onBoardDetails_Reset,
} = onBoardSlice.actions;

export default onBoardSlice.reducer;
