import Toast from 'react-native-root-toast';
import {
  resetRequestOtpState,
  resetVerifyOtpState,
} from '../redux/slice/authSlice';
import {generateOTP} from '../redux/action/authActions';
import {setShowEmailVerifyContent} from '../redux/slice/onBoardSlice';

export const handleGenerateOTPforMob = async ({
  userInput,
  dispatch,
  navigation,
}) => {
  const payload = {
    contact_number: userInput?.phoneNo?.replace(/\s+/g, ''),
    country_code: userInput?.countrieDetails?.phoneCode,
  };

  try {
    dispatch(resetRequestOtpState());
    dispatch(resetVerifyOtpState());

    const response = await dispatch(generateOTP(payload));

    if (response?.token) {
      dispatch(setShowEmailVerifyContent(false));
      navigation.navigate('OTP');
    } else {
      Toast.show(response?.message, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
      });
    }
  } catch (error) {
    console.error('Login Generate OTP API Error:', error);
  }
};
