import 'react-native-gesture-handler';

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  BackHandler,
  Image,
} from 'react-native';
import QRScanner from './scanner-page/QRScanner';
import {typography} from '../../Theme/typography';
import colors from '../../Theme/colors';
import LinearGradient from 'react-native-linear-gradient';
import BankList from './bank/BankList';
import LastUpdated from './bank/LastUpdated';
import IconGrid from './bank/IconGrid';
import BottomTabSheet from './bottomTabSheet/BottomTabSheet';
import {useDashboard} from '../../hooks/dashboard/use-dashboard';
import DashLayout from '../layout/DashLayout';

const historyData = [
  'Payment to XYZ',
  'Top-up from Card',
  'Paid to Grocery Store',
  'Bank Transfer to ABC',
  // add more as needed
];

const DashBoard = ({}) => {
  const {
    isScanning,
    handleBankSelect,
    scannedData,
    handleScan,
    handleCancel,
    setIsScanning,
    navigation,
  } = useDashboard();
  return (
    <>
      <DashLayout loader={false} showAuth={true} name="hai">
        {!isScanning && (
          <SafeAreaView style={styles.container}>
            <LastUpdated />

            <BankList handleSelect={handleBankSelect} />

            <IconGrid />
          </SafeAreaView>
        )}
        <Text onPress={() => navigation.navigate('Profile')}>Profile</Text>
      </DashLayout>

      {!isScanning && <BottomTabSheet data={historyData} />}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});

export default DashBoard;
