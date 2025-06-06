import {getCountries, requestOtp, verifyOtp} from '../../api/api';
import {
  setCountriesListFailure,
  setCountriesListLoader,
  setCountriesListSuccess,
  setRequestOtpFailure,
  setRequestOtpLoader,
  setRequestOtpSuccess,
  setVerifyOtpFailure,
  setVerifyOtpLoader,
  setVerifyOtpSuccess,
} from '../slice/authSlice';

export const fetchCountries = () => async dispatch => {
  try {
    dispatch(setCountriesListLoader());
    const response = await getCountries();
    // console.log('Countries List Response :', response);
    dispatch(setCountriesListSuccess(response));
    return response;
  } catch (error) {
    console.log('Countries List Error :', error);
    dispatch(
      setCountriesListFailure(
        error.message || 'Failed to fetch Countries List',
      ),
    );
    throw error;
  }
};

export const generateOTP = payload => async dispatch => {
  try {
    dispatch(setRequestOtpLoader());
    const response = await requestOtp(payload);
    // console.log('SignUp Request OTP Response :', response);
    if (response.success) {
      dispatch(setRequestOtpSuccess(response));
    } else {
      dispatch(
        setRequestOtpFailure(response.message || 'OTP generation failed'),
      );
    }
    return response;
  } catch (error) {
    dispatch(setRequestOtpFailure(error.message || 'ApiError'));
    throw error;
  }
};

export const verifyOTP = payload => async dispatch => {
  try {
    dispatch(setVerifyOtpLoader());
    const response = await verifyOtp(payload);
    // console.log('Verify OTP Response :', response);
    if (response.success) {
      dispatch(setVerifyOtpSuccess(response));
    } else {
      dispatch(
        setVerifyOtpFailure(response.message || 'OTP verification failed'),
      );
    }
    return response;
  } catch (error) {
    dispatch(setVerifyOtpFailure(error.message || 'ApiError'));
    throw error;
  }
};
