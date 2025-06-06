import {useNavigation} from '@react-navigation/native';
import {useRef, useState} from 'react';

export const useMpin = () => {
  const navigation = useNavigation();
  const [otpValue, setOtpValue] = useState('');
  const [invalidOtp, setInvalidOtp] = useState(false);
  const [faceIDCheckBox, setFaceIDCheckBox] = useState(false);

  const handleNavigation = () => {
    navigation.navigate('LogIn');
  };
  const handleSumbit = () => {
    navigation.navigate('MpinCreatedSuccessfully');
  };
  return {
    otpValue,
    setOtpValue,
    invalidOtp,
    handleNavigation,
    faceIDCheckBox,
    setFaceIDCheckBox,
    handleSumbit,
  };
};
