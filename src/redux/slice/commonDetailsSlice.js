import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  customerDetails_IsSubmitting: false,
  customerDetails_SubmitSuccess: false,
  customerDetails_SubmitError: null,
  customerDetails_SubmitSuccessMessage: '',
  customerDetails_SubmitErrorMessage: '',
};

const businessProfileSlice = createSlice({
  name: 'commonDetails',
  initialState,
  reducers: {
    customerDetails_submitOnBoardFormLoader: state => {
      state.customerDetails_IsSubmitting = true;
      state.customerDetails_SubmitSuccess = false;
      state.customerDetails_SubmitError = null;
      state.customerDetails_SubmitErrorMessage = '';
    },
    customerDetails_submitOnBoardFormSuccess: (state, action) => {
      state.customerDetails_IsSubmitting = false;
      state.customerDetails_SubmitSuccess = true;
      state.customerDetails_SubmitSuccessMessage = action.payload;
    },
    customerDetails_submitOnBoardFormFailure: (state, action) => {
      state.customerDetails_IsSubmitting = false;
      state.customerDetails_SubmitError = true;
      state.customerDetails_SubmitErrorMessage = action.payload;
    },
    customerDetails_submitOnBoard_reset: state => {
      state.customerDetails_IsSubmitting = false;
      state.customerDetails_SubmitSuccess = false;
      state.customerDetails_SubmitError = null;
      state.customerDetails_SubmitSuccessMessage = '';
      state.customerDetails_SubmitErrorMessage = '';
    },

    resetCommonDetailsForm: () => initialState,
  },
});

export const {
  resetCommonDetailsForm,

  customerDetails_submitOnBoardFormLoader,
  customerDetails_submitOnBoardFormSuccess,
  customerDetails_submitOnBoardFormFailure,
  customerDetails_submitOnBoard_reset,
} = businessProfileSlice.actions;

export default businessProfileSlice.reducer;
