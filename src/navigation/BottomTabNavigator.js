/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import colors from '../Theme/colors';
import {Image} from 'react-native';
import {DashBoard, History, NewPayment, Scanner, SendTo} from '../screens';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="DashBoard" // Set Home as the default tab
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.appTheme, // Use your theme color
        tabBarInactiveTintColor: colors.DimGray, // Use your theme color
        tabBarStyle: {
          backgroundColor: colors.white, // Optional: set tab bar background
          borderTopWidth: 0, // Optional: remove top border
          elevation: 8, // Optional: add shadow (Android)
          shadowOpacity: 0.1, // Optional: add shadow (iOS)
          height: 60,
        },
        tabBarIcon: ({focused, tabcolor, size}) => {
          let icon;

          switch (route.name) {
            case 'DashBoard':
              icon = require('../assets/images/Home.png');
              break;
            case 'History':
              icon = require('../assets/images/file.png');
              break;
            case 'Scanner':
              icon = require('../assets/images/scanner.png');
              break;
            case 'NewPayment':
              icon = require('../assets/images/coins.png');
              break;
            case 'SendTo':
              icon = require('../assets/images/send.png');
              break;
            default:
              icon = require('../assets/images/Home.png');
          }

          return (
            <Image
              source={icon}
              style={{
                width: 20,
                height: 20,
                tintColor: focused ? colors.appTheme : colors.DimGray,
              }}
            />
          );
        },
        tabBarLabelStyle: {
          fontSize: 12, // Customize label font size
          marginBottom: 4, // Adjust label position
        },
      })}>
      <Tab.Screen
        name="DashBoard"
        component={DashBoard}
        options={{title: 'DashBoard'}} // Customize tab label
      />
      <Tab.Screen
        name="History"
        component={History}
        options={{title: 'History'}}
      />
      <Tab.Screen
        name="Scanner"
        component={Scanner}
        options={{title: 'Scanner'}}
      />
      <Tab.Screen
        name="NewPayment"
        component={NewPayment}
        options={{title: 'NewPayment'}}
      />

      <Tab.Screen
        name="SendTo"
        component={SendTo}
        options={{title: 'SendTo'}}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
