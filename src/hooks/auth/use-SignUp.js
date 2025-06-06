import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  resetRequestOtpState,
  resetVerifyOtpState,
  setLoginDetails,
} from '../../redux/slice/authSlice';
import {fetchCountries, generateOTP} from '../../redux/action/authActions';
import {
  formatSouthAfricanPhone,
  validateSouthAfricanMobile,
} from '../../validation/Validation';

export const useSignUp = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [validationErrorMsg, setValidationErrorMsg] = useState(null);
  const userInput = useSelector(state => state?.auth?.loginDetails);
  console.log('userInput', userInput?.isRememberMe);

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
    dispatch(fetchCountries());
  }, [dispatch]);

  const isPhoneNumberInvalid = () => {
    const code = userInput?.countrieDetails?.code;
    const phoneNo = userInput?.phoneNo?.replace(/\D/g, ''); // Remove non-digits
    const phoneNoLength = phoneNo?.length;

    // For South Africa (ZA)
    if (code === 'ZA') {
      return (
        phoneNoLength !== 10 || // Must be exactly 10 digits
        !phoneNo?.startsWith('0') || // Must start with 0
        !['6', '7', '8'].includes(phoneNo?.charAt(1)) // Must be mobile prefix (6,7,8)
      );
    }
    // For other countries
    else if (['IN', 'US', 'AU'].includes(code)) {
      return phoneNoLength !== 10;
    } else if (code === 'AE') {
      return phoneNoLength !== 9;
    } else {
      return phoneNoLength !== 4;
    }
  };

  const handlePhoneNumberChange = text => {
    // For South Africa (ZA)
    if (userInput?.countrieDetails?.code === 'ZA') {
      // Remove all non-digits and limit to 10 characters
      let cleanedText = text.replace(/\D/g, '').slice(0, 10);

      // Force leading 0 if missing (but allow deletion)
      if (cleanedText.length > 0 && !cleanedText.startsWith('0')) {
        cleanedText = `0${cleanedText}`.slice(0, 10);
      }

      // Format for display
      const formattedDisplayText = formatSouthAfricanPhone(cleanedText);

      // Validate
      const isValid = validateSouthAfricanMobile(cleanedText);
      let errorMsg = '';
      if (cleanedText.length !== 10) {
        errorMsg = 'Mobile number must be exactly 10 digits.';
      } else if (!cleanedText.startsWith('0')) {
        errorMsg = 'South African numbers must start with 0.';
      } else if (!['6', '7', '8'].includes(cleanedText.charAt(1))) {
        errorMsg = `Mobile numbers must begin with 06, 07, or 08. You entered 0${cleanedText.charAt(
          1,
        )}.`;
      } else {
        errorMsg = ''; // valid
      }

      setValidationErrorMsg(errorMsg);

      dispatch(
        setLoginDetails({
          phoneNo: formattedDisplayText, // Display formatted version
          phoneNoRaw: cleanedText, // Store raw digits for validation/submission
        }),
      );
    } else {
      // Handle other countries normally
      dispatch(setLoginDetails({phoneNo: text}));
    }
  };

  const handleForgotPwd = () => {
    navigation.navigate('Mpin');
  };

  const handleSignUp = () => {
    const payload = {
      contact_no: userInput?.phoneNo?.replace(/\s+/g, ''),
      country_code: userInput?.countrieDetails?.code,
    };
    console.log('payload', payload);
    dispatch(resetRequestOtpState());
    dispatch(resetVerifyOtpState());
    dispatch(generateOTP(payload))
      .then(response => {
        console.log('SignUp Response :', response);
        if (response?.success) {
          navigation.navigate('OTP');
        }
      })
      .catch(error => {
        console.error('SignUp Error :', error);
      });
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
    handlePhoneNumberChange,
    validationErrorMsg,
    setValidationErrorMsg,
    handleForgotPwd,
  };
};
