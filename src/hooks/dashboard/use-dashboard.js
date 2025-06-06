import {useNavigation} from '@react-navigation/native';
import {useEffect, useRef, useState} from 'react';
import {BackHandler} from 'react-native';

export const useDashboard = () => {
  const navigation = useNavigation();
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState('');

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
    isScanning,
    handleBankSelect,
    scannedData,
    handleScan,
    handleCancel,
    setIsScanning,
  };
};
