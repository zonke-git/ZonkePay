import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {useCallback, useState} from 'react';
import {PermissionsAndroid, Platform, Linking, Alert} from 'react-native';
import Contacts from 'react-native-contacts';

export const useNewPayment = () => {
  const navigation = useNavigation();
  const [contactsData, setContactsData] = useState([]);
  const [permissionStatus, setPermissionStatus] = useState('checking'); // More explicit initial state
  const [isLoadingContacts, setIsLoadingContacts] = useState(false);
  const [error, setError] = useState(null);

  const handleBack = () => navigation.goBack();

  const checkAndRequestPermission = useCallback(async () => {
    try {
      let hasPermission = false;

      if (Platform.OS === 'android') {
        const status = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        );

        if (!status) {
          const result = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
            {
              title: 'Contacts Access',
              message:
                'This app needs access to your contacts to help you find friends to send payments to.',
              buttonPositive: 'OK',
              buttonNegative: 'Cancel',
              buttonNeutral: 'Ask Later',
            },
          );
          setPermissionStatus(result);
          hasPermission = result === PermissionsAndroid.RESULTS.GRANTED;
        } else {
          setPermissionStatus(PermissionsAndroid.RESULTS.GRANTED);
          hasPermission = true;
        }
      } else {
        const status = await Contacts.checkPermission();
        if (status === 'authorized') {
          setPermissionStatus('authorized');
          hasPermission = true;
        } else {
          const newStatus = await Contacts.requestPermission();
          setPermissionStatus(newStatus);
          hasPermission = newStatus === 'authorized';
        }
      }

      return hasPermission;
    } catch (err) {
      console.error('Permission error:', err);
      setPermissionStatus('error');
      setError('Failed to check permissions');
      return false;
    }
  }, []);

  const loadContacts = useCallback(async () => {
    try {
      setIsLoadingContacts(true);
      setError(null);

      const hasPermission = await checkAndRequestPermission();
      if (!hasPermission) {
        setIsLoadingContacts(false);
        return;
      }

      const contacts = await Contacts.getAll();
      if (!contacts || contacts.length === 0) {
        setError('No contacts found on device');
      }
      setContactsData(contacts || []);
    } catch (err) {
      console.error('Failed to load contacts:', err);
      setError('Failed to load contacts. Please try again.');
      setContactsData([]);
    } finally {
      setIsLoadingContacts(false);
    }
  }, [checkAndRequestPermission]);

  useFocusEffect(
    useCallback(() => {
      loadContacts();
      return () => {};
    }, [loadContacts]),
  );

  return {
    contactsData,
    handleBack,
    permissionStatus,
    isLoadingContacts,
    error,
    refreshContacts: loadContacts,
  };
};
