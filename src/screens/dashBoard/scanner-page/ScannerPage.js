import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';

const ScannerPage = () => {
  const [scannedData, setScannedData] = useState(null);
  const [isScannerVisible, setIsScannerVisible] = useState(false);
  const scannerRef = useRef(null);

  const handleScan = e => {
    setScannedData(e.data);
    setIsScannerVisible(false);
  };

  useEffect(() => {
    (async () => {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'App needs access to your camera',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert('Camera permission denied');
      }
    })();
  }, []);

  return (
    <>
      {isScannerVisible ? (
        <QRCodeScanner
          onRead={handleScan}
          reactivate={false}
          showMarker={true}
          ref={scannerRef}
          topContent={<Text style={styles.scanText}>Scan a QR Code</Text>}
          bottomContent={
            <TouchableOpacity
              onPress={() => setIsScannerVisible(false)}
              style={styles.cancelButton}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          }
        />
      ) : (
        <View style={styles.container}>
          <Text style={styles.header}>Scanner</Text>
          <Text style={styles.message}>
            Click the button below to start scanning QR codes
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => setIsScannerVisible(true)}>
            <Text style={styles.buttonText}>Start Scan</Text>
          </TouchableOpacity>

          {scannedData && (
            <View style={styles.resultBox}>
              <Text style={styles.resultText}>Scanned Data:</Text>
              <Text style={styles.dataText}>{scannedData}</Text>
            </View>
          )}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  message: {fontSize: 16, textAlign: 'center', marginBottom: 24},
  button: {
    backgroundColor: '#3b82f6',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 10,
    alignSelf: 'center',
  },
  buttonText: {color: '#fff', fontSize: 16, fontWeight: '600'},
  resultBox: {
    marginTop: 24,
    padding: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  resultText: {fontSize: 18, fontWeight: '600'},
  dataText: {fontSize: 16, color: '#333', marginTop: 4},
  scanText: {fontSize: 18, padding: 20, textAlign: 'center'},
  cancelButton: {
    padding: 14,
    backgroundColor: '#ef4444',
    marginBottom: 40,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelText: {color: '#fff', fontSize: 16},
});

export default ScannerPage;
