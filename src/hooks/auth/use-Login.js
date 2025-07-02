/* eslint-disable curly */
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {handleGenerateOTPforMob} from '../../utils/handleGenerateOTPforMob';
import {validateSouthAfricanMobile} from '../../validation/Validation';

export const useLogin = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const userInput = useSelector(state => state?.auth?.loginDetails);
  const [validationErrorMsg, setValidationErrorMsg] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const requestOtpErrorMessage = useSelector(
    state => state?.auth?.requestOtpErrorMessage,
  );
  const loading = useSelector(state => state.auth.requestOtpLoader);

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

  const handleSignUP = () => {
    navigation.navigate('SignUp');
  };

  const handleLogin = async () => {
    handleGenerateOTPforMob({userInput, dispatch, navigation});
  };

  return {
    userInput,
    isPhoneNumberInvalid,
    modalVisible,
    setModalVisible,
    validationErrorMsg,
    requestOtpErrorMessage,
    handleSignUP,
    loading,
    handleLogin,
    dispatch,
    setValidationErrorMsg,
    navigation,
  };
};
