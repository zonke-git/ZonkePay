import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCodeScanner,
} from 'react-native-vision-camera';
import {requestCameraPermission} from '../../utils/permissions';
import Icon from 'react-native-vector-icons/MaterialIcons';

const QRScanner = ({onCodeScanned, onCancel}) => {
  const [hasPermission, setHasPermission] = useState(false);
  const device = useCameraDevice('back');

  // Request camera permission
  useEffect(() => {
    (async () => {
      const status = await requestCameraPermission();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // Code scanner configuration
  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      const value = codes[0]?.value;
      if (value) {
        onCodeScanned(value);
      }
    },
  });

  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <Text>Camera permission not granted</Text>
      </View>
    );
  }

  if (!device) {
    return (
      <View style={styles.container}>
        <Text>Camera device not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        codeScanner={codeScanner}
      />

      <View style={styles.overlay}>
        <View style={styles.qrFrame} />
        <Text style={styles.qrText}>Scan a QR code</Text>
      </View>

      {/* Cancel Button */}
      <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
        <Icon name="close" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  qrFrame: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: 'white',
    backgroundColor: 'transparent',
  },
  qrText: {
    marginTop: 20,
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  cancelButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 20,
    padding: 10,
  },
});

export default QRScanner;