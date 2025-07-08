import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  setBusinessDetails,
  setOnBoardDetails,
} from '../../redux/slice/onBoardSlice';
import {BackHandler, PermissionsAndroid, Platform} from 'react-native';
import Toast from 'react-native-root-toast';
import Geolocation from '@react-native-community/geolocation';
import {fetchGoogleLocation} from '../../api/api';

export const useLocation = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [searchValue, setSearchValue] = useState();
  const token = useSelector(state => state?.auth?.authTokenInfo);
  const [isCategoryList, setIsCategoryList] = useState([
    {name: 'Cape Town'},
    {name: 'Johannesburg'},
    {name: 'Gqeberha'},
    {name: 'Durban'},
    {name: 'Pretoria'},
    {name: 'Bloemfontein'},
    {name: 'East London'},
    {name: 'Knysna'},
    {name: 'Mbombela'},
    {name: 'Plettenberg Bay'},
  ]);

  const [debouncedValue, setDebouncedValue] = useState('');
  // console.log('searchValue', searchValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(searchValue);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchValue]);

  // API call with debounced value
  useEffect(() => {
    if (debouncedValue?.length > 1) {
      const params = {
        input: debouncedValue,
        components: 'country:za',
        GOOGLE_API_KEY: 'AIzaSyCE4n2FNNx1tUYVwsLwnqbCkwoygOetgQA',
      };

      fetchGoogleLocation(token, params)
        .then(response => {
          console.log('Location API response:', response);
        })
        .catch(err => {
          console.error('Location API error:', err);
        });
    }
  }, [debouncedValue, token]);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        // navigation.navigate('Onboard');
        navigation.goBack();
        return true; // prevent default behavior (e.g., exiting the app)
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [navigation]),
  );

  const handleNavigation = async values => {
    console.log('values', values);

    dispatch(
      setOnBoardDetails({
        location: values?.name,
        location_name: values?.name,
      }),
    );
    await navigation.navigate('Onboard');
  };

  const handleCurrentLocationNavigation = async values => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          await navigation.navigate('LocationMap');
        } else {
          Toast.show('Location permission denied', {
            duration: Toast.durations.SHORT,
            position: Toast.positions.BOTTOM,
          });
          console.warn('Location permission denied');
        }
      } catch (err) {
        console.warn('Permission request error: ' + err.message);
      }
    } else {
      // iOS implementation
      try {
        const status = await Geolocation.requestAuthorization();
        console.log('status', status);

        if (status === 'granted') {
          await navigation.navigate('LocationMap');
        } else if (status === 'denied') {
          Toast.show('Location permission denied', {
            duration: Toast.durations.SHORT,
            position: Toast.positions.BOTTOM,
          });
          console.warn('Location permission denied');
        } else if (status === 'disabled') {
          Toast.show('Location services are disabled', {
            duration: Toast.durations.SHORT,
            position: Toast.positions.BOTTOM,
          });
          console.warn('Location services disabled');
        }
      } catch (err) {
        console.warn('Location permission error: ' + err.message);
      }
    }
  };

  return {
    searchValue,
    setSearchValue,
    handleNavigation,
    handleCurrentLocationNavigation,
    isCategoryList,
  };
};
