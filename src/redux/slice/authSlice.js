import {createSlice} from '@reduxjs/toolkit';
import {countries} from '../../components/ContryCode/Countries';
// import VersionCheck from 'react-native-version-check';
// import I18n from '@localization/i18n';
// import * as Sentry from '@sentry/react-native';

const initialState = {
  countriesList: [],
  countriesListLoading: false,
  countriesListError: null,

  loginDetails: {
    phoneNo: '',
    countrieDetails: countries[161],
    isRememberMe: false,
  },

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

  authTokenInfo: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
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

    setLoginDetails: (state, action) => {
      state.loginDetails = {...state.loginDetails, ...action.payload};
    },

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
  },
});

export const {
  setCountriesListLoader,
  setCountriesListSuccess,
  setCountriesListFailure,

  setLoginDetails,

  authToken,

  setRequestOtpLoader,
  setRequestOtpSuccess,
  setRequestOtpFailure,
  resetRequestOtpState,

  setVerifyOtpLoader,
  setVerifyOtpSuccess,
  setVerifyOtpFailure,
  resetVerifyOtpState,
} = authSlice.actions;

export default authSlice.reducer;
