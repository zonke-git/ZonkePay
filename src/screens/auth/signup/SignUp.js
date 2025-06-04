import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AuthLayout from '../../layout/AuthLayout';
import {useSignUp} from '../../../hooks';
import colors from '../../../theme/colors';
import {typography} from '../../../theme/typography';
import CountryPhoneInput from '../../../components/ContryCode/CountryPhoneInput';
import CustomTextField from '../../../components/TextFiled/CustomTextField';
import {i18n} from '../../../localization';
import {setLoginDetails} from '../../../redux/slice/authSlice';
import CheckBox from '../../../components/CheckBox/CheckBox';

const SignUp = () => {
  const {
    userInput,
    handleSignUp,
    modalVisible,
    setModalVisible,
    loading,
    requestOtpErrorMessage,
    dispatch,
    isPhoneNumberInvalid,
    handleBack,
    isRememberMe,
    setIsRememberMe,
  } = useSignUp();

  return (
    <AuthLayout title={i18n.t('SignInToYourAccount')} loader={loading}>
      <View style={styles.container}>
        <View>
          <CustomTextField
            label="Phone Number"
            placeholder="Enter Mobile Number"
            placeholderTextColor={colors.SilverGray}
            value={userInput?.phoneNo}
            onChangeText={text => {
              dispatch(setLoginDetails({phoneNo: text}));
            }}
            keyboardType="phone-pad"
            leftComponent={true}
            countryPhoneCode={userInput?.countrieDetails?.phoneCode}
            countryPhoneFlag={userInput?.countrieDetails?.flag}
            setOpenCountryModal={setModalVisible}
            inputStyle={styles.inputBox}
            error={requestOtpErrorMessage}
            maxLength={
              userInput?.countrieDetails?.code === 'IN' ||
              userInput?.countrieDetails?.code === 'US' ||
              userInput?.countrieDetails?.code === 'AU' ||
              userInput?.countrieDetails?.code === 'ZA'
                ? 10
                : userInput?.countrieDetails?.code === 'AE'
                ? 9
                : 4
            }
          />

          <CountryPhoneInput
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />
          <View style={styles.rememberMe_Forgot_View}>
            <CheckBox
              label={i18n.t('RememberMe')}
              labelStyle={styles.checkBoxLabel}
              value={isRememberMe}
              onToggle={() => setIsRememberMe(!isRememberMe)}
            />
            <Text style={styles.forgotTxt}>{i18n.t('ForgotPassword')} ?</Text>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.buttonWrapper]}
          onPress={handleSignUp}
          disabled={isPhoneNumberInvalid()}>
          <LinearGradient
            colors={
              isPhoneNumberInvalid()
                ? [colors.LightMistGray, colors.LightMistGray]
                : [colors.appTheme, colors.appTheme]
            }
            style={styles.button}>
            <Text
              style={[
                styles.btnText,
                {
                  color: isPhoneNumberInvalid()
                    ? colors.LightSlateGray
                    : colors.white,
                },
              ]}>
              {i18n.t('LogIn')}
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.choose_view}>
          <View style={styles.verticalLine_view} />
          <Text style={styles.Or_txt}>Or</Text>
          <View style={styles.verticalLine_view} />
        </View>

        <TouchableOpacity
          style={[styles.buttonWrapper, {borderColor: colors.CulturedGray}]}
          onPress={handleSignUp}
          disabled={isPhoneNumberInvalid()}>
          <LinearGradient
            colors={[colors.white, colors.white]}
            style={styles.button}>
            <Image
              source={require('../../../assets/images/mail.png')}
              style={styles.mailIcon}
            />
            <Text
              style={[
                styles.btnText,
                {
                  color: colors.DarkCharcoal,
                  fontFamily: typography.SemiBold_600,
                },
              ]}>
              {i18n.t('LoginUsingEmail')}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </AuthLayout>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'space-between',
    padding: 24,
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
    flexDirection: 'row',
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
  choose_view: {
    flexDirection: 'row',
    marginVertical: 16,
    justifyContent: 'space-between',
  },
  verticalLine_view: {
    width: '45%',
    height: 1,
    display: 'flex',
    backgroundColor: colors.CulturedGray,
    // justifyContent: 'center',
    // alignContent: 'center',
    // alignItems: 'center',
    alignSelf: 'center',
  },
  Or_txt: {
    fontSize: 12,
    color: colors.MediumGray,
    lineHeight: 12 * 1.5,
    letterSpacing: 12 * (-1 / 100),
    fontFamily: typography.Regular_400,
  },
  inputBox: {
    borderColor: colors.LightMistGray,
  },

  rememberMe_Forgot_View: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25.5,
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
  mailIcon: {
    width: 18,
    height: 18,
    marginRight: 10,
  },
});
