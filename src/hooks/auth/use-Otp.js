import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import Toast from 'react-native-root-toast';
import {useDispatch, useSelector} from 'react-redux';
import {BackHandler} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import messaging from '@react-native-firebase/messaging';
import {
  businessDetails_submitOnBoard_reset,
  resetBusinessDetails,
  setBusinessDetails,
  setOnBoardFormNumber,
} from '../../redux/slice/onBoardSlice';
import {
  authToken,
  resetRequestOtpState,
  resetVerifyOtpState,
} from '../../redux/slice/authSlice';
import {generateOTP, verifyOTP} from '../../redux/action/authActions';

const RESEND_OTP_TIME_LIMIT = 30;

export const useOTP = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [otpValue, setOtpValue] = useState('');
  const [timeLeft, setTimeLeft] = useState(RESEND_OTP_TIME_LIMIT);
  const [canResend, setCanResend] = useState(false);
  const loading = useSelector(state => state.auth.verifyOtpLoader);
  const ResendOTPloading = useSelector(state => state.auth.requestOtpLoader);
  const requestOtpdata = useSelector(state => state?.auth?.requestOtpdata);
  const verifyOtpError = useSelector(state => state?.auth?.verifyOtpError);
  const verifyOtpErrorMessage = useSelector(
    state => state?.auth?.verifyOtpErrorMessage,
  );
  const verifyOtpSuccess = useSelector(state => state?.auth?.verifyOtpSuccess);
  const verifyOtpData = useSelector(state => state?.auth?.verifyOtpData);
  const userInput = useSelector(state => state?.auth?.loginDetails);
  //

  // console.log('verifyOtpError', verifyOtpError);
  // console.log('verifyOtpErrorMessage', verifyOtpErrorMessage);
  // console.log('verifyOtpSuccess', verifyOtpSuccess);
  // console.log('verifyOtpData', verifyOtpData);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        // Navigate to 'Home' instead of going back
        navigation.navigate('SignUp');
        return true; // Prevent default back behavior
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [navigation]),
  );

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
    if (!canResend) {
      return;
    }

    // Add your resend OTP logic here
    console.log('Resending OTP...');

    // Reset timer
    setTimeLeft(RESEND_OTP_TIME_LIMIT);
    setCanResend(false);
    const payload = {
      contact_no: userInput?.phoneNo?.replace(/\s+/g, ''),
      country_code: userInput?.countrieDetails?.code,
    };
    console.log('payload', payload);
    dispatch(resetRequestOtpState());
    dispatch(resetVerifyOtpState());
    setOtpValue('');
    dispatch(generateOTP(payload));
  };

  const handleSubmit = async () => {
    // navigation.navigate('Onboard');
    const fcm_token = await messaging().getToken();
    const device_id = await DeviceInfo.getUniqueId(); // async
    const device_model = DeviceInfo.getModel(); // sync
    const device_version = DeviceInfo.getSystemVersion(); // sync
    const platform = DeviceInfo.getSystemName(); // sync
    const app_version = DeviceInfo.getVersion(); // sync
    // console.log('fcm_token :', fcm_token);

    const payload = {
      otp: otpValue,
      session_id: requestOtpdata?.sessionId,
      fcm_token,
      device_id,
      device_model,
      device_version,
      platform,
      app_version,
      verify_merchant: true,
    };
    console.log('payload', payload);
    navigation.navigate('Onboard');
    // dispatch(resetVerifyOtpState());
    // dispatch(businessDetails_submitOnBoard_reset());
    // dispatch(setOnBoardFormNumber(1));
    // dispatch(verifyOTP(payload))
    //   .then(response => {
    //     console.log('Verify OTP Response :', response);
    //     if (response?.is_verified && response?.success) {
    //       dispatch(
    //         setOnBoardFormNumber(
    //           // response?.merchant?.current_step_no === 3
    //           //   ? response?.merchant?.current_step_no + 1
    //           //   :
    //           response?.merchant?.current_step_no,
    //         ),
    //       );
    //       dispatch(authToken(response?.tokenInfo));
    //       dispatch(
    //         setBusinessDetails({
    //           businessCategory_id: response?.merchant?.business_type,
    //           CIPCRegistrationNumber: response?.merchant?.registration_number,
    //         }),
    //         //category_id
    //         // business_type
    //       );
    //       navigation.navigate('Onboard');
    //     } else if (response?.success && response?.new_user) {
    //       dispatch(resetBusinessDetails());
    //       navigation.navigate('Onboard');
    //     }
    //     setOtpValue('');
    //   })
    //   .catch(error => {
    //     console.error('Verify OTP Error :', error);
    //     setOtpValue('');
    //   });

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

  const handleChangeNumber = () => {
    dispatch(resetRequestOtpState());
    navigation.navigate('SignUp');
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
    loading,
    handleChangeNumber,
    ResendOTPloading,
  };
};
