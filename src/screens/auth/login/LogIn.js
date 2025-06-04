import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  Pressable,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AuthLayout from '../../layout/AuthLayout';
import {useLogin} from '../../../hooks';
import colors from '../../../theme/colors';
import {typography} from '../../../theme/typography';
import CustomTextField from '../../../components/TextFiled/CustomTextField';
import {i18n} from '../../../localization';
import CheckBox from '../../../components/CheckBox/CheckBox';

const LogIn = () => {
  const {
    MPIN,
    setMPIN,
    handleLogin,
    dispatch,
    handleSignUP,
    handleBack,
    isError,
    isLoader,
    isRememberMe,
    setIsRememberMe,
    handleBiometric,
  } = useLogin();

  return (
    <AuthLayout title={i18n.t('LoginToYourAccount')} loader={isLoader}>
      <View style={styles.container}>
        <View>
          <CustomTextField
            label={`${i18n.t('Enter')} MPIN`}
            placeholder={`${i18n.t('Enter')} MPIN`}
            placeholderTextColor={colors.SilverGray}
            value={MPIN}
            onChangeText={text => {
              setMPIN(text);
            }}
            keyboardType="phone-pad"
            inputStyle={styles.inputBox}
            error={isError}
            maxLength={4}
            style={{marginBottom: 12.5}}
          />
          <View style={styles.rememberMe_Forgot_View}>
            <CheckBox
              label={i18n.t('RememberMe')}
              labelStyle={styles.checkBoxLabel}
              value={isRememberMe}
              onToggle={() => setIsRememberMe(!isRememberMe)}
            />
            <Text style={styles.forgotTxt}>{i18n.t('Forgot')} MPIN ?</Text>
          </View>
          <Pressable
            style={styles.authButtonLoginView}
            onPress={handleBiometric}>
            <Image
              source={
                Platform.OS === 'android'
                  ? require('../../../assets/images/fingerPrint.png')
                  : require('../../../assets/images/faceId.png')
              }
              style={styles.authIcon}
            />
            <Text style={styles.authLoginTxt}>
              {Platform.OS === 'android' ? 'Fingerprint' : 'Face ID'}
            </Text>
          </Pressable>
        </View>
        <View>
          <View style={styles.signup_view}>
            <Text style={styles.signup_txt}>
              {i18n.t('DontHaveA_Account')}{' '}
            </Text>
            <TouchableOpacity onPress={handleSignUP}>
              <Text style={[styles.signup_txt, {color: colors.appTheme}]}>
                {i18n.t('SignUp')}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.buttonWrapper]}
            onPress={handleLogin}>
            <LinearGradient
              colors={[colors.appTheme, colors.appTheme]}
              style={styles.button}>
              <Text style={styles.btnText}>{i18n.t('LogIn')}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </AuthLayout>
  );
};

export default LogIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 24,
  },
  signup_view: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  signup_txt: {
    fontSize: 14,
    color: colors.DimGray,
    fontFamily: typography.SemiBold_600,
    lineHeight: 14 * 1.4,
    // letterSpacing: 12 * (0 / 100),
    marginBottom: 23,
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
  inputBox: {
    borderColor: colors.LightMistGray,
  },
  rememberMe_Forgot_View: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  checkBoxLabel: {
    fontSize: 12,
    color: colors.DimGray,
    lineHeight: 12 * 1.5,
    letterSpacing: 12 * (0 / 100),
    fontFamily: typography.Medium_500,
  },
  forgotTxt: {
    fontSize: 12,
    color: colors.appTheme,
    lineHeight: 12 * 1.4,
    letterSpacing: 12 * (0 / 100),
    fontFamily: typography.SemiBold_600,
  },
  authIcon: {
    width: 28,
    height: 28,
  },
  authButtonLoginView: {
    marginTop: 48,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: 23.5,
    paddingVertical: 10,
    backgroundColor: colors.appTheme,
    borderRadius: 30,

    // width: 'full',
    // height: 48,
    shadowColor: colors.appTheme,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.48,
    shadowRadius: 4,
    elevation: 4,
  },
  authLoginTxt: {
    fontSize: 14,
    color: colors.white,
    lineHeight: 14 * 1.4,
    letterSpacing: 14 * (-1 / 100),
    fontFamily: typography.Medium_500,
    marginLeft: 10,
  },
});
