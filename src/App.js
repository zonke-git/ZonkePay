import 'react-native-reanimated';
import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import {RootSiblingParent} from 'react-native-root-siblings';
import AppNavigator from './navigation/AppNavigator';
import {getMPIN} from './utils/authStorage';

const App = () => {
  const [initialScreen, setInitialScreen] = useState('');

  useEffect(() => {
    const checkFirstLaunch = async () => {
      try {
        const hasLaunched = await AsyncStorage.getItem('hasLaunched');
        const mpin = await getMPIN();

        // console.log('Has Launched:', hasLaunched);
        // console.log('MPIN Exists:', !!mpin);

        if (hasLaunched === null) {
          await AsyncStorage.setItem('hasLaunched', 'true');
          setInitialScreen('SplashScreen');
        } else if (mpin) {
          setInitialScreen('MpinLogIn');
        } else {
          setInitialScreen('LogIn');
        }
      } catch (e) {
        console.error('Error checking launch state:', e);
        setInitialScreen('SplashScreen');
      }
    };

    checkFirstLaunch();

    const fallbackTimeout = setTimeout(() => {
      if (!initialScreen) {
        console.warn('Fallback triggered, setting default screen');
        setInitialScreen('LogIn');
      }
    }, 5000);

    return () => clearTimeout(fallbackTimeout);
  }, []);

  return (
    <RootSiblingParent>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      {initialScreen ? (
        <Provider store={store}>
          <NavigationContainer>
            <AppNavigator initialRouteName={initialScreen} />
          </NavigationContainer>
        </Provider>
      ) : (
        <>
          {/* <FullScreenLoader /> */}
        </>
      )}
    </RootSiblingParent>
  );
};

export default App;
