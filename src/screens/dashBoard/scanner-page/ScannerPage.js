import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View, Text, Button} from 'react-native';
import QRScanner from './QRScanner';

const ScannerPage = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState('');

  const handleScan = data => {
    setScannedData(data);
    setIsScanning(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {isScanning ? (
        <QRScanner onCodeScanned={handleScan} />
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
          <Button
            title="Scan QR Code"
            onPress={() => setIsScanning(true)}
            style={styles.scanButton}
          />
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
    marginTop: 20,
    width: 200,
  },
});

export default ScannerPage;