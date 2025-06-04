import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
// import ReactNativeBiometrics from 'react-native-biometrics';
import {Alert} from 'react-native';

// const rnBiometrics = new ReactNativeBiometrics();

export const useLogin = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [MPIN, setMPIN] = useState('');
  const [isLoader, setIsLoader] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isRememberMe, setIsRememberMe] = useState(false);

  useEffect(() => {
    if (MPIN == 4) {
      // OTP request was successful, navigate to the OTP verification screen
      navigation.navigate('OTP');
    }

    if (isError) {
      // Handle the error, e.g., display an error message to the user
      console.warn('Error requesting OTP:', isError);
      // Optionally, reset the error state in your reducer after displaying the message
    }
  }, [MPIN, isError, navigation]);

  const handleLogin = () => {
    const payload = {
      mpin: '1234',
    };

    console.log('payload', payload);

    // dispatch(generateOTP(payload));

    // Implement login logic here
    navigation.navigate('OTP');
  };

  const handleSignUP = () => {
    navigation.navigate('SignUp');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleBiometric = () => {
    // rnBiometrics
    //   .simplePrompt({promptMessage: 'Confirm fingerprint or face'})
    //   .then(resultObject => {
    //     const {success} = resultObject;

    //     if (success) {
    //       Alert.alert('Success', 'Biometric Auth succeeded');
    //     } else {
    //       Alert.alert('Cancelled', 'User cancelled biometric prompt');
    //     }
    //   })
    //   .catch(() => {
    //     Alert.alert('Error', 'Biometric Auth failed');
    //   });
  };

  return {
    MPIN,
    setMPIN,
    handleLogin,
    dispatch,
    handleSignUP,
    handleBack,
    isError,
    isLoader,
    isRememberMe,
    setIsRememberMe,
    handleBiometric,
  };
};
