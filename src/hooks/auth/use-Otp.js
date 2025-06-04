import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useCallback, useEffect, useState} from 'react';
import Toast from 'react-native-root-toast';
import {resetVerifyOtpState, verifyOTP} from '../../redux/slice/authSlice';
import {useDispatch, useSelector} from 'react-redux';
import {Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import messaging from '@react-native-firebase/messaging';

const RESEND_OTP_TIME_LIMIT = 30;

export const useOTP = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [otpValue, setOtpValue] = useState('');
  const [timeLeft, setTimeLeft] = useState(RESEND_OTP_TIME_LIMIT);
  const [canResend, setCanResend] = useState(false);
  const loading = useSelector(state => state.auth.verifyOtpLoader);
  const requestOtpdata = useSelector(state => state?.auth?.requestOtpdata);
  const verifyOtpError = useSelector(state => state?.auth?.verifyOtpError);
  const verifyOtpErrorMessage = useSelector(
    state => state?.auth?.verifyOtpErrorMessage,
  );
  const verifyOtpSuccess = useSelector(state => state?.auth?.verifyOtpSuccess);
  const verifyOtpData = useSelector(state => state?.auth?.verifyOtpData);
  //

  // console.log('verifyOtpError', verifyOtpError);
  // console.log('verifyOtpErrorMessage', verifyOtpErrorMessage);
  // console.log('verifyOtpSuccess', verifyOtpSuccess);
  console.log('verifyOtpData', verifyOtpData);

  useEffect(() => {
    if (verifyOtpSuccess) {
      // OTP request was successful, navigate to the OTP verification screen
      navigation.navigate('Onboard');
    }

    if (verifyOtpError) {
      // Handle the error, e.g., display an error message to the user
      console.warn('Error requesting OTP:', verifyOtpErrorMessage);
      // Optionally, reset the error state in your reducer after displaying the message
    }
  }, [navigation, verifyOtpError, verifyOtpErrorMessage, verifyOtpSuccess]);

  // useEffect(() => {
  //   if (!timeLeft) {
  //     setCanResend(true);
  //     return;
  //   }

  //   const timerId = setInterval(() => {
  //     setTimeLeft(prev => {
  //       if (prev <= 1) {
  //         clearInterval(timerId);
  //         setCanResend(true);
  //         return 0;
  //       }
  //       return prev - 1;
  //     });
  //   }, 1000);

  //   return () => clearInterval(timerId);
  // }, [timeLeft]);

  useFocusEffect(
    useCallback(() => {
      if (!timeLeft) {
        setCanResend(true);
        return;
      }

      const timerId = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerId);
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // 🔴 Clear timer when user leaves screen
      return () => {
        clearInterval(timerId);
      };
    }, [timeLeft]),
  );

  useEffect(() => {
    if (otpValue?.length == 6) {
      handleSubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otpValue]);

  const formatTime = seconds => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  const handleResendOTP = () => {
    if (!canResend) return;

    // Add your resend OTP logic here
    console.log('Resending OTP...');

    // Reset timer
    setTimeLeft(RESEND_OTP_TIME_LIMIT);
    setCanResend(false);
  };

  const handleSubmit = async () => {
    // navigation.navigate('Onboard');
    const fcm_token = await messaging().getToken();
    // console.log('fcm_token :', fcm_token);

    const payload = {
      otp: otpValue,
      session_id: requestOtpdata?.sessionId,
      fcm_token,
      device_id: DeviceInfo.getUniqueId(),
      device_model: DeviceInfo.getModel(),
      device_version: DeviceInfo.getSystemVersion(),
      platform: Platform.OS,
    };
    console.log('payload', payload);

    dispatch(resetVerifyOtpState());
    dispatch(verifyOTP(payload));

    // setInvalidOtp(true);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const showToastMessage = () => {
    Toast.show('Please fill OTP', {
      duration: Toast.durations.SHORT,
      position: Toast.positions.BOTTOM,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
    });
  };

  return {
    otpValue,
    setOtpValue,
    canResend,
    timeLeft,
    formatTime,
    handleResendOTP,
    handleSubmit,
    handleBack,
    verifyOtpError,
    verifyOtpErrorMessage,
    verifyOtpSuccess,
  };
};
