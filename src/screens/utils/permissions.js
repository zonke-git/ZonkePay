import {PermissionsAndroid, Platform} from 'react-native';
import {Camera} from 'react-native-vision-camera';

export const requestCameraPermission = async () => {
  if (Platform.OS === 'android') {
    try {
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
      return granted;
    } catch (err) {
      console.warn(err);
      return 'denied';
    }
  }

  // For iOS
  const status = await Camera.requestCameraPermission();
  return status;
};
