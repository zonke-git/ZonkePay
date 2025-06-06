import 'react-native-reanimated';
import 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import messaging from '@react-native-firebase/messaging';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import {RootSiblingParent} from 'react-native-root-siblings';
import FullScreenLoader from './components/Loader/FullScreenLoader';
import {requestUserPermission} from './utils/notificationPermission';
import {
  History,
  Location,
  LocationMap,
  LogIn,
  Mpin,
  MpinCreatedSuccessfully,
  NewPayment,
  Onboard,
  OTP,
  ScannerPage,
  SignUp,
  SplashScreen,
  WalletCreatedSuccessfully,
  Welcome,
} from './screens';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

const App = () => {
  const [initialScreen, setInitialScreen] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(true); // 🔑 Track login status

  useEffect(() => {
    async function getPermissionAndToken() {
      const token = await requestUserPermission();
      if (token) {
        // console.log('Token :', token);
        // Send token to your backend or save it for later
      }
    }
    getPermissionAndToken();

    messaging().onMessage(remoteMessage => {
      console.log('Foreground message:', remoteMessage);
      // Display the notification to the user
    });
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'App opened by notification while in foreground:',
        remoteMessage,
      );
      // Handle notification interaction when the app is in the foreground
    });
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        console.log(
          'App opened by notification from closed state:',
          remoteMessage,
        );
        // Handle notification interaction when the app is opened from a closed state
      });
  }, []);

  useEffect(() => {
    const checkFirstLaunch = async () => {
      try {
        const hasLaunched = await AsyncStorage.getItem('hasLaunched');
        if (hasLaunched === null) {
          await AsyncStorage.setItem('hasLaunched', 'true');
          setInitialScreen('SplashScreen'); // First time
        } else {
          // setInitialScreen('SignUp'); // Not first time
          setInitialScreen('NewPayment'); // Not first time
        }
      } catch (e) {
        console.error('Error checking launch status:', e);
        setInitialScreen('SplashScreen');
      }
    };

    checkFirstLaunch();
  }, []);

  return (
    <>
      <RootSiblingParent>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        {initialScreen !== '' ? (
          <Provider store={store}>
            <GestureHandlerRootView style={{flex: 1}}>
              <BottomSheetModalProvider>
                <NavigationContainer>
                  <Stack.Navigator
                    initialRouteName={initialScreen}
                    screenOptions={({route}) => ({
                      headerShown: false,
                      cardStyleInterpolator:
                        CardStyleInterpolators.forHorizontalIOS,
                    })}>
                    <>
                      {/* {!isAuthenticated ? ( */}
                      <>
                        <Stack.Screen
                          name="SplashScreen"
                          component={SplashScreen}
                        />
                        <Stack.Screen name="Welcome" component={Welcome} />
                        <Stack.Screen name="SignUp" component={SignUp} />
                        <Stack.Screen name="Onboard" component={Onboard} />
                        <Stack.Screen name="Location" component={Location} />
                        <Stack.Screen
                          name="LocationMap"
                          component={LocationMap}
                        />
                        <Stack.Screen name="LogIn" component={LogIn} />
                        <Stack.Screen name="OTP" component={OTP} />
                        <Stack.Screen
                          name="WalletCreatedSuccessfully"
                          component={WalletCreatedSuccessfully}
                        />

                        <Stack.Screen name="Mpin" component={Mpin} />
                        <Stack.Screen
                          name="MpinCreatedSuccessfully"
                          component={MpinCreatedSuccessfully}
                        />
                        <Stack.Screen
                          name="ScannerPage"
                          component={ScannerPage}
                        />

                        <Stack.Screen name="History" component={History} />
                        <Stack.Screen
                          name="NewPayment"
                          component={NewPayment}
                        />
                      </>
                      {/* ) : ( */}
                      {/* <>
                      <Stack.Screen
                        name="MainApp"
                        component={BottomTabNavigator}
                      />
                    </> */}
                      {/* )} */}
                    </>
                  </Stack.Navigator>
                </NavigationContainer>
              </BottomSheetModalProvider>
            </GestureHandlerRootView>
          </Provider>
        ) : (
          <>
            <FullScreenLoader />
          </>
        )}
      </RootSiblingParent>
    </>
  );
};

export default App;
