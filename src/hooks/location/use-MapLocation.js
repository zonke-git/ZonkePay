import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {setBusinessDetails} from '../../redux/slice/onBoardSlice';
import {
  Alert,
  AppState,
  Linking,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';

export const useMapLocation = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [appState, setAppState] = useState(AppState.currentState);
  const [location, setLocation] = useState(null);
  const [locationAddress, setLocationAddress] = useState(null);
  const [error, setError] = useState(null);
  const [showGpsPrompt, setShowGpsPrompt] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null); // New state for selected location
  const [selectedLocationAddress, setSelectedLocationAddress] = useState(null); // New state for selected address
  const [fetchingAddress, setFetchingAddress] = useState(false); // New state for address loading
  const mapRef = React.useRef(null);

  useEffect(() => {
    getLocation();
  }, [getLocation]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        getLocation();
      }
      setAppState(nextAppState);
    });

    return () => {
      subscription.remove();
    };
  }, [appState, getLocation]);

  const hasLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      // On iOS, just check if we have permission
      const status = await Geolocation.requestAuthorization('whenInUse');
      return status === 'granted';
    }

    // For Android
    if (Platform.Version < 23) {
      return true;
    }

    const hasFineLocation = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasFineLocation) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    return status === PermissionsAndroid.RESULTS.GRANTED;
  };

  const getLocation = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const hasPermission = await hasLocationPermission();

      if (!hasPermission) {
        setError('Location permission denied');
        setLoading(false);
        Alert.alert(
          'Permission Required',
          'Please enable location permissions in settings.',
          [
            {text: 'Cancel', style: 'cancel'},
            {text: 'Open Settings', onPress: openLocationSettings},
          ],
        );
        return;
      }

      // First try high accuracy
      let position = await new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(
          resolve,
          errors => {
            console.log('High accuracy failed, trying lower accuracy:', errors);
            // Fallback to lower accuracy if high fails
            Geolocation.getCurrentPosition(resolve, reject, {
              enableHighAccuracy: false,
              timeout: 10000,
              maximumAge: 0,
            });
          },
          {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
          },
        );
      });

      const {latitude, longitude} = position.coords;
      console.log('Got coordinates:', latitude, longitude); // Debug log

      const loc = {
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };

      // Fetch address
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyCE4n2FNNx1tUYVwsLwnqbCkwoygOetgQA`,
      );
      const data = await response.json();

      if (data.status === 'OK' && data.results.length > 0) {
        const components = data.results[0].address_components;

        const city =
          components.find(c => c.types.includes('locality'))?.long_name ||
          components.find(c => c.types.includes('administrative_area_level_2'))
            ?.long_name;

        const address = data.results[0].formatted_address;
        let addressData = {
          city: city,
          address: address,
        };
        console.log('📍 Location:', addressData);
        setLocation(loc);
        setLocationAddress(addressData);
        setSelectedLocation(loc);
        setSelectedLocationAddress(addressData);
      } else {
        console.log('❌ No address found or error:', data.status);
      }

      if (mapRef.current) {
        mapRef.current.animateToRegion(loc, 1000);
      }
    } catch (errors) {
      console.log('Final location error:', errors);
      setError(errors.message || 'Unable to get current location');

      if (errors.code === 2 || errors.code === 'CLEARED') {
        setShowGpsPrompt(true);
        Alert.alert(
          'Enable GPS',
          'For better accuracy, please enable GPS in your device settings',
          [
            {text: 'Cancel', style: 'cancel'},
            {text: 'Open Settings', onPress: openLocationSettings},
          ],
        );
      }

      // Fallback to default location
      const fallbackLocation = {
        latitude: 20.5937,
        longitude: 78.9629,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
      };
      setLocation(fallbackLocation);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleMapPress = async e => {
    const {coordinate} = e.nativeEvent;
    setSelectedLocation(coordinate);
    setFetchingAddress(true);

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinate.latitude},${coordinate.longitude}&key=AIzaSyCE4n2FNNx1tUYVwsLwnqbCkwoygOetgQA`,
      );
      const data = await response.json();

      if (data.status === 'OK' && data.results.length > 0) {
        const components = data.results[0].address_components;

        const city =
          components.find(c => c.types.includes('locality'))?.long_name ||
          components.find(c => c.types.includes('administrative_area_level_2'))
            ?.long_name;

        const address = data.results[0].formatted_address;
        let addressData = {
          city: city,
          address: address,
        };
        console.log('📍 Location:', addressData);
        setSelectedLocationAddress(addressData);
      } else {
        console.log('❌ No address found or error:', data.status);
      }
    } catch (errors) {
      console.log('Reverse Geocode error:', errors);
    } finally {
      setFetchingAddress(false);
    }
  };

  const handleSelect = async () => {
    if (selectedLocation) {
      console.log('selectedLocation', selectedLocation);

      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${selectedLocation.latitude},${selectedLocation.longitude}&key=AIzaSyCE4n2FNNx1tUYVwsLwnqbCkwoygOetgQA`,
        );
        const data = await response.json();

        if (data.status === 'OK' && data.results.length > 0) {
          const components = data.results[0].address_components;

          const city =
            components.find(c => c.types.includes('locality'))?.long_name ||
            components.find(c =>
              c.types.includes('administrative_area_level_2'),
            )?.long_name;

          const address = data.results[0].formatted_address;
          let addressData = {
            city: city,
            address: address,
          };
          console.log('📍 Location:', addressData);
          setSelectedLocationAddress(addressData);
          dispatch(
            setBusinessDetails({
              businessLocation: selectedLocation,
              businessLocation_name: city,
            }),
          );
          navigation.navigate('Onboard');
        } else {
          console.log('❌ No address found or error:', data.status);
        }
      } catch (errors) {
        console.log('Reverse Geocode error:', errors);
      } finally {
        setFetchingAddress(false);
      }

      // You can dispatch the selected location to Redux here if needed
      // dispatch(setBusinessDetails({businessLocation: selectedLocation}));
    } else {
      Alert.alert(
        'No Location Selected',
        'Please tap on the map to select a location',
      );
    }
  };

  const showEnableGpsDialog = () => {
    Alert.alert(
      'Enable GPS',
      'For better accuracy, please enable GPS in your device settings',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Open Settings', onPress: openLocationSettings},
      ],
    );
  };

  const openLocationSettings = () => {
    if (Platform.OS === 'android') {
      Linking.sendIntent('android.settings.LOCATION_SOURCE_SETTINGS');
    } else {
      Linking.openURL('app-settings:');
    }
  };

  return {
    mapRef,
    fetchingAddress,
    selectedLocationAddress,
    locationAddress,
    location,
    selectedLocation,
    loading,
    error,
    showGpsPrompt,
    showEnableGpsDialog,
    handleMapPress,
    handleSelect,
  };
};
