import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {generateOTP, resetRequestOtpState} from '../../redux/slice/authSlice';

export const useSignUp = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [isRememberMe, setIsRememberMe] = useState(false);
  const userInput = useSelector(state => state?.auth?.loginDetails);
  const loading = useSelector(state => state.auth.requestOtpLoader);
  const requestOtpError = useSelector(state => state?.auth?.requestOtpError);
  const requestOtpSuccess = useSelector(
    state => state?.auth?.requestOtpSuccess,
  );
  const requestOtpErrorMessage = useSelector(
    state => state?.auth?.requestOtpErrorMessage,
  );
  const requestOtpdata = useSelector(state => state?.auth?.requestOtpdata);

  // console.log('userInput', userInput);
  // console.log('requestOtpdata', requestOtpdata);

  useEffect(() => {
    if (requestOtpSuccess) {
      // OTP request was successful, navigate to the OTP verification screen
      navigation.navigate('OTP');
    }

    if (requestOtpError) {
      // Handle the error, e.g., display an error message to the user
      console.warn('Error requesting OTP:', requestOtpErrorMessage);
      // Optionally, reset the error state in your reducer after displaying the message
    }
  }, [
    requestOtpSuccess,
    requestOtpError,
    requestOtpErrorMessage,
    navigation,
    loading,
  ]);

  const isPhoneNumberInvalid = () => {
    const code = userInput?.countrieDetails?.code;
    const phoneNoLength = userInput?.phoneNo?.length;

    if (['IN', 'US', 'AU', 'ZA'].includes(code)) {
      return phoneNoLength !== 10;
    } else if (code === 'AE') {
      return phoneNoLength !== 9;
    } else {
      return phoneNoLength !== 4;
    }
  };

  const handleSignUp = () => {
    const payload = {
      contact_no: userInput?.phoneNo,
      country_code: userInput?.countrieDetails?.code,
    };
    // console.log('payload', payload);
    dispatch(resetRequestOtpState());
    dispatch(generateOTP(payload));
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return {
    userInput,
    handleSignUp,
    modalVisible,
    setModalVisible,
    loading,
    requestOtpErrorMessage,
    dispatch,
    isPhoneNumberInvalid,
    handleBack,
    isRememberMe,
    setIsRememberMe,
  };
};
