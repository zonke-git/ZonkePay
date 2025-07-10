import {useNavigation} from '@react-navigation/native';
import {useEffect, useRef, useState} from 'react';
import {BackHandler} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  customerDetailsByID,
  getMerchantWalletId,
  getwalletId,
} from '../../redux/action/commonDetailsActions';

export const useDashboard = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState('');
  const token = useSelector(state => state.auth?.authTokenInfo);

  const wallet_Id = useSelector(
    state =>
      state.commonDetails?.customerDetails_SubmitSuccessMessage?.merchant
        ?.walletId?.details?.data?.walletId,
  );

  // console.log('commonDetails', wallet_Id);

  useEffect(() => {
    dispatch(getwalletId(token, wallet_Id));
    dispatch(getMerchantWalletId(token, wallet_Id));
  }, [dispatch, token, wallet_Id]);

  useEffect(() => {
    dispatch(customerDetailsByID(token));
  }, [dispatch, token]);

  const handleScan = data => {
    setScannedData(data);
    setIsScanning(false);
  };

  const handleCancel = () => {
    setIsScanning(false);
  };

  // Add this useEffect in ScannerPage
  useEffect(() => {
    const backAction = () => {
      if (isScanning) {
        setIsScanning(false);
        return true; // Prevent default back behavior
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [isScanning]);

  const handleBankSelect = value => {
    if (value === 0) {
      navigation.navigate('NewPayment');
    } else if (value === 1) {
      navigation.navigate('SendTo');
    }
  };

  return {
    navigation,
    isScanning,
    handleBankSelect,
    scannedData,
    handleScan,
    handleCancel,
    setIsScanning,
  };
};
