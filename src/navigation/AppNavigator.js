import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {CardStyleInterpolators} from '@react-navigation/stack';
import BottomTabNavigator from './BottomTabNavigator';
import {
  AddMenu,
  // BusinessDetailsVerifiedSuccessfully,
  BusinessProfile,
  Location,
  LocationMap,
  LogIn,
  Menu,
  Mpin,
  MpinCreatedSuccessfully,
  MpinLogin,
  Onboard,
  OTP,
  Outlet,
  OutletList,
  SignUp,
  SplashScreen,
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
      {/* <Stack.Screen name="BusinessProfile" component={BusinessProfile} /> */}
      {/* <Stack.Screen
        name="BusinessDetailsVerifiedSuccessfully"
        component={BusinessDetailsVerifiedSuccessfully}
      /> */}
      <Stack.Screen name="Mpin" component={Mpin} />
      <Stack.Screen
        name="MpinCreatedSuccessfully"
        component={MpinCreatedSuccessfully}
      />
      {/* <Stack.Screen name="OutletList" component={OutletList} /> */}
      {/* <Stack.Screen name="Outlet" component={Outlet} /> */}
      {/* <Stack.Screen name="MainApp" component={BottomTabNavigator} /> */}
      {/* <Stack.Screen name="Menu" component={Menu} /> */}
      {/* <Stack.Screen name="AddMenu" component={AddMenu} /> */}
    </Stack.Navigator>
  );
};

export default AppNavigator;
