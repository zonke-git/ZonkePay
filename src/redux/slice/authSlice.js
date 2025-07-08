import {createSlice} from '@reduxjs/toolkit';
import {countries} from '../../components/ContryCode/Countries';
// import VersionCheck from 'react-native-version-check';
// import I18n from '@localization/i18n';
// import * as Sentry from '@sentry/react-native';

const initialState = {
  loginDetails: {
    // phoneNo: '812333334',
    // phoneNo: '844444443',
    // phoneNo: '844444447',
    phoneNo: '',
    countrieDetails: countries[161],
  },

  // customerDetailsById: '',
  authTokenInfo: '',

  requestOtpLoader: false,
  requestOtpSuccess: false,
  requestOtpError: false,
  requestOtpErrorMessage: '',
  requestOtpSuccessVersion: 0,
  requestOtpErrorVersion: 0,
  requestOtpdata: {},

  verifyOtpLoader: false,
  verifyOtpSuccess: false,
  verifyOtpError: false,
  verifyOtpErrorMessage: '',
  verifyOtpToken: '',
  verifyOtpData: {},
  verifyOtpSuccessVersion: 0,
  verifyOtpErrorVersion: 0,

  merchant_id: '',
  merchant_details: '',
  showForgotPage: false,

  countriesList: [],
  countriesListLoading: false,
  countriesListError: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoginDetails: (state, action) => {
      state.loginDetails = {...state.loginDetails, ...action.payload};
    },

    // setCustomerDetailsById: (state, action) => {
    //   state.customerDetailsById = action.payload;
    // },

    authToken: (state, action) => {
      state.authTokenInfo = action.payload;
    },

    // ✅ Handle OTP request
    setRequestOtpLoader: state => {
      state.requestOtpLoader = true;
    },
    setRequestOtpSuccess: (state, action) => {
      state.requestOtpLoader = false;
      state.requestOtpSuccess = true;
      state.requestOtpdata = action.payload;
      state.requestOtpSuccessVersion += 1;
      state.requestOtpError = false;
      state.requestOtpErrorMessage = '';
    },
    setRequestOtpFailure: (state, action) => {
      state.requestOtpLoader = false;
      state.requestOtpError = true;
      state.requestOtpErrorMessage = action.payload;
      state.requestOtpErrorVersion += 1;
    },
    resetRequestOtpState: state => {
      state.requestOtpLoader = false;
      state.requestOtpSuccess = false;
      state.requestOtpError = false;
      state.requestOtpErrorMessage = '';
      state.requestOtpdata = {};
      state.requestOtpSuccessVersion = 0;
      state.requestOtpErrorVersion = 0;
    },

    // ✅ Handle OTP verify
    setVerifyOtpLoader: state => {
      state.verifyOtpLoader = true;
    },
    setVerifyOtpSuccess: (state, action) => {
      state.verifyOtpLoader = false;
      state.verifyOtpSuccess = true;
      state.verifyOtpToken = action.payload?.token;
      state.verifyOtpData = action.payload;
      state.verifyOtpSuccessVersion += 1;
      state.verifyOtpError = false;
      state.verifyOtpErrorMessage = '';
    },
    setVerifyOtpFailure: (state, action) => {
      state.verifyOtpLoader = false;
      state.verifyOtpError = true;
      state.verifyOtpErrorMessage = action.payload;
      state.verifyOtpErrorVersion += 1;
    },
    resetVerifyOtpState: state => {
      state.verifyOtpLoader = false;
      state.verifyOtpSuccess = false;
      state.verifyOtpError = false;
      state.verifyOtpErrorMessage = '';
      state.verifyOtpToken = '';
      state.verifyOtpData = {};
      state.verifyOtpSuccessVersion = 0;
      state.verifyOtpErrorVersion = 0;
    },

    //
    //
    //
    //
    //
    //
    //
    //
    //
    setCountriesListLoader: state => {
      state.countriesListLoading = true;
      state.countriesListError = null;
    },
    setCountriesListSuccess: (state, action) => {
      state.countriesListLoading = false;
      state.countriesList = action.payload;
    },
    setCountriesListFailure: (state, action) => {
      state.countriesListLoading = false;
      state.countriesListError = action.payload;
    },

    setMerchant_id: (state, action) => {
      state.merchant_id = action.payload;
    },

    setMerchant_details: (state, action) => {
      state.merchant_details = action.payload;
    },

    setShowForgotPage: (state, action) => {
      state.showForgotPage = action.payload;
    },
  },
});

export const {
  setLoginDetails,
  // setCustomerDetailsById,
  authToken,

  setRequestOtpLoader,
  setRequestOtpSuccess,
  setRequestOtpFailure,
  resetRequestOtpState,

  setVerifyOtpLoader,
  setVerifyOtpSuccess,
  setVerifyOtpFailure,
  resetVerifyOtpState,

  //
  setMerchant_id,
  setMerchant_details,
  setShowForgotPage,

  setCountriesListLoader,
  setCountriesListSuccess,
  setCountriesListFailure,
} = authSlice.actions;

export default authSlice.reducer;
