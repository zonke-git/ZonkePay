import React from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import SuccessfullyLayout from '../../layout/SuccessfullyLayout';
import colors from '../../../Theme/colors';
import {typography} from '../../../Theme/typography';
import {i18n} from '../../../localization';
import {useNavigation} from '@react-navigation/native';

const WalletCreatedSuccessfully = () => {
  const navigation = useNavigation();
  return (
    <SuccessfullyLayout>
      <View style={styles.container}>
        <View style={{alignItems: 'center'}}>
          <FastImage
            source={require('../../../assets/images/success.gif')}
            style={styles.tickIcon}
            resizeMode={FastImage.resizeMode.contain}
          />
          <Text style={styles.successText}>Wallet Created Successfully!</Text>
          <Text style={styles.WalletID_Text}>Wallet ID: ZA-12345678</Text>
          <Text style={styles.readyMsg_Text}>Your Zonke Wallet is ready.</Text>
          <Text style={styles.readyMsg_Text}>
            Complete your profile and sign your agreement to start receiving
            payments.
          </Text>
        </View>
        <View style={styles.btnView}>
          <TouchableOpacity
            style={styles.buttonWrapper}
            onPress={() => {
              navigation.navigate('ScannerPage');
            }}>
            <LinearGradient
              colors={[colors.white, colors.white]}
              style={styles.button}>
              <Text style={[styles.btnText, {color: colors.DimGray}]}>
                {i18n.t('BusinessProfile')}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonWrapper}
            onPress={() => {
              navigation.navigate('ScannerPage');
            }}>
            <LinearGradient
              colors={[colors.appTheme, colors.appTheme]}
              style={styles.button}>
              <Text style={styles.btnText}>{i18n.t('SignAgreement')}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </SuccessfullyLayout>
  );
};

export default WalletCreatedSuccessfully;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 24,
    alignItems: 'center',
    paddingHorizontal: 24,
    justifyContent: 'space-between',
  },
  tickIcon: {
    width: 250,
    height: 250,
  },
  successText: {
    fontSize: 20,
    lineHeight: 36,
    // letterSpacing: 12 * (0 / 100),
    color: colors.RichBlack,
    fontFamily: typography.SemiBold_600,
    marginBottom: 2,
  },
  WalletID_Text: {
    fontSize: 16,
    lineHeight: 24,
    // letterSpacing: 12 * (0 / 100),
    color: colors.SimplyCharcoal,
    fontFamily: typography.Regular_400,
    marginBottom: 12,
  },
  readyMsg_Text: {
    fontSize: 14,
    lineHeight: 20,
    // letterSpacing: 12 * (0 / 100),
    color: colors.SimplyCharcoalDarkGray,
    fontFamily: typography.Regular_400,
    textAlign: 'center',
  },

  btnView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  buttonWrapper: {
    // position: "absolute",
    // top: 706,
    // left: 201,
    // width: 150,
    // height: 48,

    borderRadius: 10,
    shadowColor: colors.DenimBlue,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.48,
    shadowRadius: 4,
    elevation: 4,
  },
  button: {
    flex: 1,
    borderRadius: 10,
    // paddingVertical: 10,
    // paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 23,
  },
  btnText: {
    fontSize: 14,
    color: colors.white,
    fontFamily: typography.Medium_500,
    lineHeight: 14 * 1.4,
    letterSpacing: 14 * (-1 / 100),
  },
});
