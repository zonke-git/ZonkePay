import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {CardStyleInterpolators} from '@react-navigation/stack';
import BottomTabNavigator from './BottomTabNavigator';
import {
  Location,
  LocationMap,
  LogIn,
  Mpin,
  MpinCreatedSuccessfully,
  MpinLogin,
  Onboard,
  OTP,
  Profile,
  SignUp,
  SplashScreen,
  UserType,
  WalletCreatedSuccessfully,
  Welcome,
} from '../screens';

const Stack = createStackNavigator();

const AppNavigator = ({initialRouteName}) => {
  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={({route}) => ({
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      })}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="UserType" component={UserType} />
      <Stack.Screen name="Onboard" component={Onboard} />
      <Stack.Screen name="Location" component={Location} />
      <Stack.Screen name="LocationMap" component={LocationMap} />
      <Stack.Screen name="MpinLogIn" component={MpinLogin} />
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
      <Stack.Screen name="MainApp" component={BottomTabNavigator} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
