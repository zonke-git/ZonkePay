import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {validateSouthAfricanMobile} from '../../validation/Validation';
import Toast from 'react-native-root-toast';
import {ForgotMPIN_API} from '../../api/api';
import {getAuthToken} from '../../utils/authStorage';
import {handleGenerateOTPforMob} from '../../utils/handleGenerateOTPforMob';
import {Alert, BackHandler} from 'react-native';

export const useSignUp = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [validationErrorMsg, setValidationErrorMsg] = useState('');
  const userInput = useSelector(state => state?.auth?.loginDetails);
  const loading = useSelector(state => state.auth.requestOtpLoader);
  const showForgotPage = useSelector(state => state?.auth?.showForgotPage);
  const requestOtpError = useSelector(state => state?.auth?.requestOtpError);
  const requestOtpSuccess = useSelector(
    state => state?.auth?.requestOtpSuccess,
  );
  const requestOtpErrorMessage = useSelector(
    state => state?.auth?.requestOtpErrorMessage,
  );
  const requestOtpdata = useSelector(state => state?.auth?.requestOtpdata);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        // Confirm exit
        Alert.alert('Exit App', 'Are you sure you want to exit the app?', [
          {text: 'Cancel', style: 'cancel'},
          {text: 'Yes', onPress: () => BackHandler.exitApp()},
        ]);
        return true; // prevent default back behavior
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, []),
  );

  const isPhoneNumberInvalid = () => {
    const code = userInput?.countrieDetails?.code;
    const phoneNo = userInput?.phoneNoRaw;
    const phoneNoLength = phoneNo?.length;

    if (!phoneNo) return true;

    // For South Africa (ZA)
    if (code === 'ZA') {
      return !validateSouthAfricanMobile(phoneNo);
    } else if (['IN', 'US', 'AU'].includes(code)) {
      return phoneNoLength !== 10;
    } else if (code === 'AE') {
      return phoneNoLength !== 9;
    } else {
      return phoneNoLength !== 4;
    }
  };

  const handleSignUp = async () => {
    if (showForgotPage) {
      setIsLoader(true);
      const auth_token = await getAuthToken();
      let payload = {
        contact_number: userInput?.phoneNoRaw,
        country_code: userInput?.countrieDetails?.phoneCode,
      };

      await ForgotMPIN_API(payload, auth_token)
        .then(response => {
          if (response) {
            navigation.navigate('OTP');
          } else {
            Toast.show(response?.message, {
              duration: Toast.durations.SHORT,
              position: Toast.positions.BOTTOM,
            });
          }
          setIsLoader(false);
        })
        .catch(error => {
          setIsLoader(false);
          console.error('Forgot MPIN Error :', error);
        });
    } else {
      handleGenerateOTPforMob({userInput, dispatch, navigation});
    }
  };

  const handleLogin = () => {
    navigation.navigate('LogIn');
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
    validationErrorMsg,
    showForgotPage,
    isLoader,
    handleLogin,
    setValidationErrorMsg,
  };
};
