import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {i18n} from '../../localization';
import AuthLayout from '../layout/AuthLayout';
import colors from '../../theme/colors';
import {typography} from '../../theme/typography';
import OtpCodeField from '../../components/Otp/OtpCodeField';
import CheckBox from '../../components/CheckBox/CheckBox';
import {useMpin} from '../../hooks/mpin/use-Mpin';

const Mpin = () => {
  const {
    otpValue,
    setOtpValue,
    invalidOtp,
    faceIDCheckBox,
    setFaceIDCheckBox,
    handleSumbit,
  } = useMpin();
  return (
    <AuthLayout
      title={`${i18n.t('Create')} MPIN`}
      subTitle={i18n.t(
        'SetYouPersonal4_digitMPIN_ItWillBeUsedForSecureAndFastSignIn',
      )}
      loader={false}>
      <View style={styles.container}>
        <View style={styles.insideContainer}>
          <Text style={styles.titleTxt}>{i18n.t('Enter')} MPIN</Text>
          <View style={styles.optView}>
            <OtpCodeField
              value={otpValue}
              setValue={setOtpValue}
              invalidOtp={invalidOtp}
              CUSTOM_CELL_COUNT={4}
              showValues={false}
              customInputStyle={styles.otpBox}
              OTP_textColor={{color: colors.CharcoalGray}}
            />
          </View>
          <CheckBox
            label={i18n.t('EnableFace_ID_AlongWith_MPIN_Creation')}
            labelStyle={styles.checkBoxLabel}
            value={faceIDCheckBox}
            onToggle={() => {
              setFaceIDCheckBox(!faceIDCheckBox);
            }}
          />
        </View>
        <TouchableOpacity style={[styles.buttonWrapper]} onPress={handleSumbit}>
          <LinearGradient
            colors={[colors.appTheme, colors.appTheme]}
            style={styles.button}>
            <Text style={styles.btnText}>{i18n.t('Create')} MPIN</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </AuthLayout>
  );
};

export default Mpin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 24,
  },
  insideContainer: {},
  titleTxt: {
    fontSize: 14,
    color: colors.EerieBlack,
    lineHeight: 20,
    letterSpacing: 12 * (0 / 100),
    fontFamily: typography.Medium_500,
    textAlign: 'center',
  },
  optView: {
    paddingHorizontal: 60,
    paddingTop: 12,
    paddingBottom: 24,
  },
  otpBox: {
    width: 54,
    height: 57,
  },
  checkBoxLabel: {
    fontSize: 12,
    color: colors.WarmGrayTone,
    lineHeight: 12 * 1.5,
    letterSpacing: 12 * (-1 / 100),
    fontFamily: typography.Medium_500,
  },
  buttonWrapper: {
    width: 'full',
    height: 48,

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
    paddingVertical: 10,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 14,
    color: colors.white,
    lineHeight: 14 * 1.4,
    letterSpacing: 12 * (-1 / 100),
    fontFamily: typography.Medium_500,
  },
});
