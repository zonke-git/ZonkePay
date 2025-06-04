// /* eslint-disable react/no-unstable-nested-components */
// import React from 'react';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import {View, TouchableOpacity, StyleSheet, Image, Text} from 'react-native';
// import {Community, Home, Pay, Profile, Transactions} from '../screens';
// import colors from '../theme/colors';
// import {typography} from '../theme/typography';

// const Tab = createBottomTabNavigator();

// const CustomTabBarButton = ({children, onPress}) => (
//   <TouchableOpacity
//     style={styles.customButtonContainer}
//     onPress={onPress}
//     activeOpacity={0.9}>
//     <View style={styles.customButton}>{children}</View>
//   </TouchableOpacity>
// );

// const BottomTabNavigator = () => {
//   return (
//     <Tab.Navigator
//       screenOptions={{
//         headerShown: false,
//         tabBarShowLabel: false,
//         tabBarStyle: {
//           position: 'absolute',
//           left: 20,
//           right: 20,
//           elevation: 0,
//           backgroundColor: '#ffffff',
//           height: 72,
//           //   borderRadius: 15,
//           ...styles.shadow,
//         },
//       }}>
//       <Tab.Screen
//         name="Home"
//         component={Home}
//         options={{
//           tabBarIcon: ({focused}) => (
//             <View style={styles.tabItem}>
//               <Image
//                 source={require('../assets/images/Home.png')}
//                 style={[
//                   styles.Icon,
//                   {tintColor: focused ? '#e32f45' : '#748c94'},
//                 ]}
//               />
//               <Text
//                 style={{color: focused ? '#e32f45' : '#748c94', fontSize: 12}}>
//                 Home
//               </Text>
//             </View>
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Community"
//         component={Community}
//         options={{
//           tabBarIcon: ({focused}) => (
//             <View style={styles.tabItem}>
//               <Image
//                 source={require('../assets/images/Community.png')}
//                 style={[
//                   styles.Icon,
//                   {tintColor: focused ? '#e32f45' : '#748c94'},
//                 ]}
//               />
//               <Text
//                 style={{color: focused ? '#e32f45' : '#748c94', fontSize: 12}}>
//                 Community
//               </Text>
//             </View>
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Pay"
//         component={Pay}
//         options={{
//           tabBarIcon: ({focused}) => (
//             <View style={styles.tabItem}>
//               <Image
//                 source={require('../assets/images/PayButton.png')}
//                 style={{width: 80, height: 80, resizeMode: 'contain'}}
//               />
//               <Text
//                 style={[
//                   styles.tabName,
//                   {color: focused ? colors.appTheme : colors.DimGray},
//                 ]}>
//                 Pay
//               </Text>
//             </View>
//           ),
//           tabBarButton: props => <CustomTabBarButton {...props} />,
//         }}
//       />
//       <Tab.Screen
//         name="Transactions"
//         component={Transactions}
//         options={{
//           tabBarIcon: ({focused}) => (
//             <View style={styles.tabItem}>
//               <Image
//                 source={require('../assets/images/Transactions.png')}
//                 style={[
//                   styles.Icon,
//                   {tintColor: focused ? colors.appTheme : colors.DimGray},
//                 ]}
//               />
//               <Text
//                 style={[
//                   styles.tabName,
//                   {color: focused ? colors.appTheme : colors.DimGray},
//                 ]}>
//                 Transactions
//               </Text>
//             </View>
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Profile"
//         component={Profile}
//         options={{
//           tabBarIcon: ({focused}) => (
//             <View style={styles.tabItem}>
//               <Image
//                 source={require('../assets/images/Profile.png')}
//                 style={[
//                   styles.Icon,
//                   {tintColor: focused ? colors.appTheme : colors.DimGray},
//                 ]}
//               />
//               <Text
//                 style={[
//                   styles.tabName,
//                   {color: focused ? colors.appTheme : colors.DimGray},
//                 ]}>
//                 Profile
//               </Text>
//             </View>
//           ),
//         }}
//       />
//     </Tab.Navigator>
//   );
// };

// export default BottomTabNavigator;

// const styles = StyleSheet.create({
//   shadow: {
//     shadowColor: '#7F5DF0',
//     shadowOffset: {width: 0, height: 10},
//     shadowOpacity: 0.25,
//     shadowRadius: 3.5,
//     elevation: 5,
//   },
//   customButtonContainer: {
//     top: -30,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   customButton: {
//     width: 70,
//     height: 70,
//     borderRadius: 35,
//     backgroundColor: '#e32f45',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   Icon: {
//     width: 24,
//     height: 24,
//     resizeMode: 'contain',
//   },
//   tabItem: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     // paddingTop: 5,
//     backgroundColor: 'lightgray',
//     width: '100%',
//   },
//   tabName: {
//     fontSize: 12,
//     color: colors.DimGray,
//     lineHeight: 20,
//     letterSpacing: 0.1,
//     fontFamily: typography.Medium_500,
//   },
// });
