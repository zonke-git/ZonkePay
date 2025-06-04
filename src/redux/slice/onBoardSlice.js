import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  onBoardValues: {
    firstName: '',
    lastName: '',
    nickname: '',
    email: '',
    phoneNumber: '',
    location: '',
    referralCode: '',
    termsAndConditions_PrivacyPolicyCheckBox: false,
  },

  isSubmitting: false,
  submitSuccess: false,
  submitError: null,
  submitSuccessMessage: '',
  submitErrorMessage: '',
  version: 0,
};

const onBoardSlice = createSlice({
  name: 'onBoard',
  initialState,
  reducers: {
    setOnBoardDetails: (state, action) => {
      state.onBoardValues = {...state.onBoardValues, ...action.payload};
    },

    submitOnBoardFormLoader: state => {
      state.isSubmitting = true;
      state.submitSuccess = false;
      state.submitError = null;
    },
    submitOnBoardFormSuccess: (state, action) => {
      state.isSubmitting = false;
      state.submitSuccess = true;
      state.submitSuccessMessage = action.payload;
      state.version += 1;
    },
    submitOnBoardFormFailure: (state, action) => {
      state.isSubmitting = false;
      state.submitError = true;
      state.submitErrorMessage = action.payload;
      state.version += 1;
    },
    resetOnBoardForm: () => initialState,
  },
});

export const {
  setOnBoardDetails,
  submitOnBoardFormLoader,
  submitOnBoardFormSuccess,
  submitOnBoardFormFailure,
  resetOnBoardForm,
} = onBoardSlice.actions;

export default onBoardSlice.reducer;
