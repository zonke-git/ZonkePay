import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useOTP} from '../../../hooks';
import AuthLayout from '../../layout/AuthLayout';
import colors from '../../../theme/colors';
import {typography} from '../../../theme/typography';
import OtpCodeField from '../../../components/Otp/OtpCodeField';
import {i18n} from '../../../localization';

const OTP = () => {
  const {
    otpValue,
    setOtpValue,
    canResend,
    timeLeft,
    formatTime,
    handleResendOTP,
    handleSubmit,
    handleBack,
    verifyOtpError,
    verifyOtpErrorMessage,
  } = useOTP();

  return (
    <AuthLayout
      title={i18n.t('VerificationCode')}
      subTitle={i18n.t('WeHaveSentTheVerificationCodeToYourPhoneNumber')}>
      <View style={styles.container}>
        <View>
          <OtpCodeField
            value={otpValue}
            setValue={setOtpValue}
            invalidOtp={verifyOtpError ? verifyOtpErrorMessage : ''}
          />

          <View style={styles.timerContainer}>
            <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>

            <TouchableOpacity onPress={handleResendOTP} disabled={!canResend}>
              <Text
                style={[
                  styles.timerText,
                  styles.resendText,
                  {
                    color: !canResend ? colors.LightSlateGray : colors.appTheme,
                  },
                ]}>
                {i18n.t('ResendOTP')}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.buttonWrapper, {marginBottom: 16}]}
            onPress={handleSubmit}>
            <LinearGradient
              colors={
                otpValue?.length === 6
                  ? [colors.appTheme, colors.appTheme]
                  : [colors.LightMistGray, colors.LightMistGray]
              }
              style={[styles.button, {}]}>
              <Text
                style={[
                  styles.btnText,
                  {
                    color:
                      otpValue?.length === 6
                        ? colors.white
                        : colors.LightSlateGray,
                  },
                ]}>
                OTP {i18n.t('ViaCall')}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.buttonWrapper]} onPress={handleBack}>
            <LinearGradient
              colors={[colors.white, colors.white]}
              style={styles.button}>
              <Text style={[styles.btnText, {color: colors.DarkCharcoal}]}>
                {i18n.t('ChangeNumber')}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <View>
          <Pressable style={styles.emailLogin_pressable}>
            <Text style={styles.emailLogin_txt}>
              {i18n.t('TryLoggingInUsingEmail')}
            </Text>
          </Pressable>
        </View>
      </View>
    </AuthLayout>
  );
};

export default OTP;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 24,
    paddingTop: 44,
  },

  buttonWrapper: {
    width: 'full',
    height: 48,
    borderRadius: 10,
    shadowColor: colors.DenimBlue,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.48,
    shadowRadius: 4,
    elevation: 5,
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
    fontFamily: typography.Regular_400,
  },

  timerContainer: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: "center",
    marginBottom: 24,
  },
  timerText: {
    fontSize: 12,
    color: colors.appTheme,
    lineHeight: 12 * 1.4,
    letterSpacing: 12 * (0 / 100),
    fontFamily: typography.Medium_500,
  },
  resendText: {
    textDecorationLine: 'underline',
    fontFamily: typography.SemiBold_600,
  },
  emailLogin_pressable: {
    marginBottom: 40,
  },
  emailLogin_txt: {
    textAlign: 'center',
    fontSize: 12,
    color: colors.appTheme,
    lineHeight: 12 * 1.4,
    letterSpacing: 12 * (0 / 100),
    fontFamily: typography.Medium_500,
  },
});
