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

  return {
    otpValue,
    setOtpValue,
    invalidOtp,
    handleNavigation,
    faceIDCheckBox,
    setFaceIDCheckBox,
  };
};
