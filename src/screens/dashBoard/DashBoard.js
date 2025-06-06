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
import {typography} from '../../theme/typography';
import colors from '../../theme/colors';
import LinearGradient from 'react-native-linear-gradient';
import BankList from './bank/BankList';
import LastUpdated from './bank/LastUpdated';
import DashboardLayout from '../layout/DashboardLayout';
import IconGrid from './bank/IconGrid';
import BottomTabSheet from './bottomTabSheet/BottomTabSheet';
import {useDashboard} from '../../hooks/dashboard/use-dashboard';

const historyData = [
  'Payment to XYZ',
  'Top-up from Card',
  'Paid to Grocery Store',
  'Bank Transfer to ABC',
  // add more as needed
];

const DashBoard = ({navigation}) => {
  const {
    isScanning,
    handleBankSelect,
    scannedData,
    handleScan,
    handleCancel,
    setIsScanning,
  } = useDashboard();
  return (
    <>
      <DashboardLayout title={''} loader={false} showAuth={true}>
        {!isScanning && (
          <SafeAreaView style={styles.container}>
            <LastUpdated />

            <BankList handleSelect={handleBankSelect} />

            <IconGrid />

            {scannedData && (
              <View style={styles.content}>
                <Text style={styles.scannedText}>Scanned Data:</Text>
                <Text style={styles.scannedData}>{scannedData}</Text>
              </View>
            )}
          </SafeAreaView>
        )}
        {isScanning && (
          <QRScanner onCodeScanned={handleScan} onCancel={handleCancel} />
        )}
      </DashboardLayout>

      {!isScanning && <BottomTabSheet data={historyData} />}

      {!isScanning && (
        <View style={styles.scannerBtn_view}>
          <TouchableOpacity
            style={styles.buttonWrapper}
            onPress={() => setIsScanning(true)}>
            <LinearGradient
              colors={[colors.appTheme, colors.AmberOrange]}
              style={styles.button}>
              <Image
                source={require('../../assets/images/scanner.png')}
                style={styles.scannedIcon}
              />
            </LinearGradient>
            <Text style={styles.btnText}>Scan QR Code</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  content: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // padding: 20,
  },

  scannedText: {
    fontSize: 18,
    marginBottom: 10,
    fontFamily: typography.Bold_700,
  },
  scannedData: {
    fontSize: 16,
    marginBottom: 30,
    padding: 15,
    // backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  scannerBtn_view: {
    flexDirection: 'column',
    position: 'absolute',
    bottom: 50,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    // flex: 1,
  },
  buttonWrapper: {
    // width: 90,
    // height: 140,
    borderRadius: 100,
    shadowColor: colors.DenimBlue,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.48,
    shadowRadius: 4,
    elevation: 19,
    alignItems: 'center',
  },
  button: {
    width: 80,
    height: 80,
    borderRadius: 40, // Half of width/height
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.DenimBlue,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  scannedIcon: {
    width: 34,
    height: 34,
    resizeMode: 'contain',
  },

  btnText: {
    fontSize: 14,
    color: colors.black,
    lineHeight: 14 * 1.4,
    letterSpacing: 12 * (-1 / 100),
    fontFamily: typography.ExtraBoldItalic_800,
    marginTop: 10,
  },
});

export default DashBoard;
