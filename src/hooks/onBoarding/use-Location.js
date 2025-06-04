import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useCallback, useState} from 'react';
import {useDispatch} from 'react-redux';
import {setOnBoardDetails} from '../../redux/slice/onBoardSlice';
import {BackHandler, PermissionsAndroid, Platform} from 'react-native';
import Toast from 'react-native-root-toast';

export const useLocation = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [searchValue, setSearchValue] = useState();
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

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        navigation.navigate('Onboard');
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

    await dispatch(setOnBoardDetails({location: values}));
    await navigation.navigate('Onboard');
  };

  const handleCurrentLocationNavigation = async values => {
    // await dispatch(setOnBoardDetails({location: values}));

    // };

    // const checkLocationPermission = async () => {
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
          // getCurrentLocation();
          await navigation.navigate('LocationMap');
        } else {
          Toast.show('Location permission denied', {
            duration: Toast.durations.SHORT,
            position: Toast.positions.BOTTOM,
          });

          console.warn('Location permission denied');

          // setError();
        }
      } catch (err) {
        console.warn('Permission request error: ' + err.message);
        // setError();
      }
    } else {
      // For iOS, we can directly request location
      // getCurrentLocation();
    }
  };

  return {
    searchValue,
    setSearchValue,
    isCategoryList,
    handleNavigation,
    handleCurrentLocationNavigation,
  };
};
