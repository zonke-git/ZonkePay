import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import QRScanner from './QRScanner';

const ScannerPage = ({navigation}) => {
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

  return (
    <SafeAreaView style={styles.container}>
      {isScanning ? (
        <QRScanner onCodeScanned={handleScan} onCancel={handleCancel} />
      ) : (
        <View style={styles.content}>
          {scannedData ? (
            <>
              <Text style={styles.scannedText}>Scanned Data:</Text>
              <Text style={styles.scannedData}>{scannedData}</Text>
            </>
          ) : (
            <Text style={styles.instructionText}>
              Click the button below to scan a QR code
            </Text>
          )}
          <TouchableOpacity
            style={styles.scanButton}
            onPress={() => setIsScanning(true)}>
            <Text style={styles.scanButtonText}>Scan QR Code</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  instructionText: {
    fontSize: 18,
    marginBottom: 30,
    textAlign: 'center',
  },
  scannedText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scannedData: {
    fontSize: 16,
    marginBottom: 30,
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  scanButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 20,
  },
  scanButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ScannerPage;
