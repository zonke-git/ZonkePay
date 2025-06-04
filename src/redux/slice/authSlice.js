import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {countries} from '../../components/ContryCode/Countries';
import {requestOtp, verifyOtp} from '../../api/api';
// import VersionCheck from 'react-native-version-check';
// import I18n from '@localization/i18n';
// import * as Sentry from '@sentry/react-native';

export const generateOTP = createAsyncThunk(
  'auth/generateOTP',
  async (payload, {rejectWithValue}) => {
    try {
      const response = await requestOtp(payload);
      console.log('SignUp Request OTP Response :', response);

      if (response.success) {
        return response;
      } else {
        return rejectWithValue(response.message);
      }
    } catch (err) {
      return rejectWithValue('ApiError');
    }
  },
);

export const verifyOTP = createAsyncThunk(
  'auth/verifyOTP',
  async (payload, {rejectWithValue}) => {
    try {
      const response = await verifyOtp(payload);
      console.log('Verify OTP Response :', response);

      if (response.success) {
        return response;
      } else {
        return rejectWithValue(response.message);
      }
    } catch (err) {
      if (err?.response?.status !== 401) {
        // Sentry.captureException(
        //   'verifyOTP: ' +
        //     JSON.stringify({
        //       exception_message: err.message,
        //       //   app_Version: VersionCheck.getCurrentVersion(),
        //       method: 'POST',
        //     }),
        // );
      }
      //   return rejectWithValue(I18n.t('ApiError'));
      return 'ApiError';
    }
  },
);

const initialState = {
  loginDetails: {
    phoneNo: '',
    countrieDetails: countries[161],
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
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoginDetails: (state, action) => {
      state.loginDetails = {...state.loginDetails, ...action.payload};
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
  extraReducers: builder => {
    // Request OTP
    builder
      .addCase(generateOTP.pending, state => {
        state.requestOtpLoader = true;
      })
      .addCase(generateOTP.fulfilled, (state, action) => {
        state.requestOtpLoader = false;
        state.requestOtpSuccess = true;
        state.requestOtpdata = action.payload;
        state.requestOtpSuccessVersion += 1;
        state.requestOtpError = false;
        state.requestOtpErrorMessage = '';
      })
      .addCase(generateOTP.rejected, (state, action) => {
        state.requestOtpLoader = false;
        state.requestOtpError = true;
        state.requestOtpErrorMessage = action.payload;
        state.requestOtpErrorVersion += 1;
      });

    // Verify OTP
    builder
      .addCase(verifyOTP.pending, state => {
        state.verifyOtpLoader = true;
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.verifyOtpLoader = false;
        state.verifyOtpSuccess = true;
        state.verifyOtpToken = action.payload?.token;
        state.verifyOtpData = action.payload;
        state.verifyOtpSuccessVersion += 1;
        state.verifyOtpError = false;
        state.verifyOtpErrorMessage = '';
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.verifyOtpLoader = false;
        state.verifyOtpError = true;
        state.verifyOtpErrorMessage = action.payload;
        state.verifyOtpErrorVersion += 1;
      });
  },
});

export const {setLoginDetails, resetRequestOtpState, resetVerifyOtpState} =
  authSlice.actions;

export default authSlice.reducer;
