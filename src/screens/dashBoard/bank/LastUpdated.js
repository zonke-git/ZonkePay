import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import {typography} from '../../../theme/typography';
import colors from '../../../theme/colors';
import LinearGradient from 'react-native-linear-gradient';

const banks = [
  {name: 'HDFC', icon: require('../../../assets/images/bank.png')},
  {name: 'SBI', icon: require('../../../assets/images/bank.png')},
  {name: 'ICICI', icon: require('../../../assets/images/bank.png')},
  {name: 'Axis', icon: require('../../../assets/images/bank.png')},
  {name: 'Kotak', icon: require('../../../assets/images/bank.png')},
];

const LastUpdated = () => {
  return (
    <View style={styles.container}>
      <View style={styles.leftSideContent_view}>
        <View style={styles.iconName_view}>
          <Image
            source={require('../../../assets/images/bank.png')}
            style={styles.bankIcon}
          />
          <Text style={styles.bankName_txt}>HSBC</Text>
        </View>
        <Text style={styles.LastUpdatedTxt}>Last Updated Balance</Text>
        <Text style={styles.amount_txt}>₹85,625</Text>
        <Text style={styles.primary_txt}>Primary</Text>
      </View>
      <View style={styles.refresh_view}>
        <Pressable>
          <LinearGradient
            colors={[colors.appTheme, colors.AmberOrange]}
            style={styles.refreshButton_view}>
            <Image
              source={require('../../../assets/images/refresh.png')}
              style={styles.refresh_icon}
            />
          </LinearGradient>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: 16,
    // paddingVertical: 20,
    flexDirection: 'row',
    // width: '100%',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  leftSideContent_view: {
    flex: 1,
  },
  iconName_view: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  bankIcon: {
    width: 20,
    height: 20,
    // marginBottom: 6,
    resizeMode: 'contain',
  },
  bankName_txt: {
    fontSize: 12,
    color: colors.black,
    lineHeight: 12 * 1.0,
    // letterSpacing: 12 * (-1 / 100),
    fontFamily: typography.Bold_700,
    textAlign: 'center',
    marginLeft: 10,
  },
  LastUpdatedTxt: {
    fontSize: 16,
    color: colors.black,
    lineHeight: 16 * 1.0,
    letterSpacing: 16 * (-1 / 100),
    fontFamily: typography.Regular_400,
    marginBottom: 6,
  },
  amount_txt: {
    fontSize: 34,
    color: colors.black,
    lineHeight: 34 * 1.0,
    letterSpacing: 34 * (-1 / 100),
    fontFamily: typography.Bold_700,
    marginBottom: 6,
  },
  primary_txt: {
    fontSize: 16,
    // color: colors.black,
    color: '#17C261',
    lineHeight: 16 * 1.0,
    letterSpacing: 16 * (-1 / 100),
    fontFamily: typography.Medium_500,
  },
  refresh_view: {
    alignSelf: 'center',
    flex: 1,
    // justifyContent: 'center',
    // alignContent: 'center',
    alignItems: 'center',
  },
  refreshButton_view: {
    padding: 3,
    borderRadius: 30,
  },
  refresh_icon: {
    width: 30,
    height: 30,
  },
  //
  //
  //
  //
  //
  bankBox: {
    width: 84,
    height: 84,
    marginRight: 12,
    backgroundColor: '#EEF7FB',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  bankName: {
    fontSize: 12,
    textAlign: 'center',
    fontFamily: typography.Medium_500,
    color: colors.black,
  },
});

export default LastUpdated;
