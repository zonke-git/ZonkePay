/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-catch-shadow */
import Geolocation from '@react-native-community/geolocation';
import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  Alert,
  TouchableOpacity,
  Linking,
  AppState,
  Image,
  ActivityIndicator,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import AuthLayout from '../../layout/AuthLayout';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../../theme/colors';
import {typography} from '../../../theme/typography';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {setOnBoardDetails} from '../../../redux/slice/onBoardSlice';

const LocationMap = () => {
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
          Error => {
            console.log('High accuracy failed, trying lower accuracy:', Error);
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
    } catch (Error) {
      console.log('Final location error:', Error);
      setError(Error.message || 'Unable to get current location');

      if (Error.code === 2 || Error.code === 'CLEARED') {
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
    } catch (Error) {
      console.log('Reverse Geocode error:', Error);
    } finally {
      setFetchingAddress(false);
    }
  };

  const handleSelect = () => {
    if (selectedLocation) {
      // You can dispatch the selected location to Redux here if needed
      dispatch(setOnBoardDetails({location: selectedLocation}));

      // Or pass it back through navigation params
      navigation.navigate('Location', {
        selectedLocation,
        selectedLocationAddress,
      });
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

  return (
    <AuthLayout
      title="Please Select Location"
      topStyle={{flex: 0.085}}
      fontStyle={{fontSize: 24}}>
      <View style={styles.container}>
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            {showGpsPrompt && (
              <TouchableOpacity onPress={showEnableGpsDialog}>
                <Text style={styles.enableGpsText}>Enable GPS</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        <MapView
          provider={PROVIDER_GOOGLE}
          ref={mapRef}
          style={[
            styles.map,
            {
              marginBottom:
                fetchingAddress || selectedLocationAddress || locationAddress
                  ? '37%'
                  : '22%',
            },
          ]}
          region={
            location || {
              latitude: -26.2041,
              longitude: 28.0473,
              latitudeDelta: 10.0, // Adjust delta to fit the full country
              longitudeDelta: 10.0,
            }
          }
          mapType={'standard'}
          zoomControlEnabled
          showsUserLocation={true}
          showsMyLocationButton={true}
          followsUserLocation={true}
          loadingEnabled={true}
          onPress={handleMapPress}>
          {location && (
            <Marker
              coordinate={location}
              title="You are here"
              pinColor={colors.gradientGreen}
            />
          )}
          {selectedLocation && (
            <Marker
              coordinate={selectedLocation}
              title="Selected Location"
              pinColor={colors.appTheme} // Custom color for selected marker
            />
          )}
        </MapView>
      </View>

      <View style={styles.bottomContainer}>
        {fetchingAddress ? (
          <View style={styles.addressLoadingContainer}>
            <ActivityIndicator size="small" color={colors.appTheme} />
            <Text style={styles.loadingText}>Fetching address...</Text>
          </View>
        ) : selectedLocationAddress ? (
          <View style={styles.addressView}>
            <Image
              source={require('../../../assets/images/location.png')}
              style={styles.locationIcon}
            />
            <View style={styles.cityAddressView}>
              <Text style={styles.cityText}>
                {selectedLocationAddress?.city || 'Unknown location'}
              </Text>
              <Text style={styles.lineAddressText}>
                {selectedLocationAddress?.address || ''},
              </Text>
            </View>
          </View>
        ) : locationAddress ? (
          <View style={styles.addressView}>
            <Image
              source={require('../../../assets/images/location.png')}
              style={[styles.locationIcon]}
            />
            <View style={styles.cityAddressView}>
              <Text style={styles.cityText}>
                Current Location: {locationAddress?.city}
              </Text>
              <Text style={styles.lineAddressText}>
                {locationAddress?.city},{locationAddress?.address},
              </Text>
            </View>
          </View>
        ) : null}
        {loading && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color={colors.appTheme} />
            <Text style={[styles.cityText, {color: colors.black}]}>
              Get Current Location
            </Text>
          </View>
        )}

        <TouchableOpacity style={styles.buttonWrapper} onPress={handleSelect}>
          <LinearGradient
            colors={[colors.appTheme, colors.appTheme]}
            style={styles.button}>
            <Text style={styles.btnText}>Select Location</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </AuthLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'red',
  },
  map: {
    flex: 1,

    ...StyleSheet.absoluteFillObject,
  },
  errorContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    zIndex: 1,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    textAlign: 'center',
  },
  enableGpsText: {
    color: 'blue',
    textAlign: 'center',
    marginTop: 8,
  },
  bottomContainer: {
    padding: 24,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    elevation: 10, // for Android shadow
    shadowColor: '#000', // for iOS shadow
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },

  buttonWrapper: {
    width: '100%',
    borderRadius: 10,
    shadowColor: colors.DenimBlue,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.48,
    shadowRadius: 4,
    elevation: 4,
  },
  button: {
    borderRadius: 10,
    paddingVertical: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 14,
    color: colors.white,
    lineHeight: 14 * 1.4,
    letterSpacing: 14 * (-1 / 100),
    fontFamily: typography.Medium_500,
  },
  addressView: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
    marginBottom: 16,
  },
  locationIcon: {
    width: 22,
    height: 28,
    tintColor: colors.SimplyCharcoal,
    marginRight: 13,
  },
  cityAddressView: {
    flexDirection: 'column',
  },
  cityText: {
    fontSize: 16,
    color: colors.SimplyCharcoal,
    lineHeight: 16 * 1.4,
    letterSpacing: 14 * (0 / 100),
    fontFamily: typography.SemiBold_600,
  },
  lineAddressText: {
    fontSize: 14,
    color: colors.SimplyCharcoalDarkGray,
    lineHeight: 14 * 1.4,
    letterSpacing: 14 * (0 / 100),
    fontFamily: typography.Regular_400,
    marginTop: 4,
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
});

export default LocationMap;
