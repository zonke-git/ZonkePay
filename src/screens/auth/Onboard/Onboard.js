import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import AuthLayout from '../../layout/AuthLayout';
import {useOnboard} from '../../../hooks';
import {i18n} from '../../../localization';
import {setOnBoardDetails} from '../../../redux/slice/onBoardSlice';
import colors from '../../../theme/colors';
import CustomTextField from '../../../components/TextFiled/CustomTextField';
import LinearGradient from 'react-native-linear-gradient';
import {Formik} from 'formik';
import {typography} from '../../../theme/typography';
import CheckBox from '../../../components/CheckBox/CheckBox';
import {onboardValidationSchema} from '../../schema/validationSchemas';
import Toast from 'react-native-root-toast';

const Onboard = () => {
  const {
    loginDetails,
    dispatch,
    onBoardFormValues,
    handleLocationNavigation,
    handleFormSubmit,
  } = useOnboard();

  return (
    <AuthLayout title={i18n.t('HelloLetsGetYouOnboard')}>
      <View style={styles.container}>
        <Formik
          initialValues={onBoardFormValues}
          validationSchema={onboardValidationSchema}
          onSubmit={handleFormSubmit}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            setFieldTouched,
            values,
            errors,
            touched,
            isValid,
            dirty,
          }) => {
            const renderTextField = (fieldName, label, options = {}) => (
              <CustomTextField
                label={label}
                required={options.required}
                placeholder={`${label}${options.required ? '*' : ''}`}
                placeholderTextColor={colors.SilverGray}
                value={values[fieldName]}
                onChangeText={text => {
                  setFieldValue(fieldName, text);
                  dispatch(setOnBoardDetails({[fieldName]: text}));
                }}
                onBlur={handleBlur(fieldName)}
                error={touched[fieldName] && errors[fieldName]}
                keyboardType={options.keyboardType}
                multiline={options.multiline}
                numberOfLines={options.numberOfLines}
              />
            );
            return (
              <>
                <View style={styles.formContainer}>
                  <View>
                    {renderTextField('firstName', i18n.t('FirstName'), {
                      required: true,
                    })}

                    {renderTextField('lastName', i18n.t('LastName'), {
                      required: true,
                    })}

                    {renderTextField(
                      'nickname',
                      i18n.t('Nickname_Optional'),
                      {},
                    )}
                    {renderTextField('email', i18n.t('EmailID'), {
                      required: true,
                      keyboardType: 'email-address',
                    })}

                    <CustomTextField
                      label={i18n.t('PhoneNumber')}
                      placeholder={i18n.t('EnterMobileNumber')}
                      placeholderTextColor={colors.SilverGray}
                      value={loginDetails?.email}
                      keyboardType="phone-pad"
                      leftComponent={true}
                      countryPhoneCode={
                        loginDetails?.countrieDetails?.phoneCode
                      }
                      countryPhoneFlag={loginDetails?.countrieDetails?.flag}
                      inputStyle={styles.inputBox}
                      disable={false}
                    />

                    <View style={styles.selectableBox_view}>
                      <Text style={styles.label}>
                        {i18n.t('Location')}
                        <Text style={styles.required}>*</Text>
                      </Text>
                      <TouchableOpacity
                        style={[
                          styles.selectableBox,
                          touched.location &&
                            errors.location &&
                            styles.inputError,
                        ]}
                        onPress={() => {
                          setFieldTouched('location', true);
                          handleLocationNavigation();
                        }}>
                        <Image
                          source={require('../../../assets/images/location.png')}
                          style={styles.locationIcon}
                        />
                        <Text
                          style={[
                            styles.boxData_txt,
                            {
                              color: values?.location
                                ? colors.EerieBlack
                                : colors.SilverGray,
                            },
                          ]}>
                          {values?.location ||
                            i18n.t('Select') + ' ' + i18n.t('Location')}
                        </Text>
                      </TouchableOpacity>

                      {touched.location && errors.location && (
                        <Text style={styles.error}>{errors.location}</Text>
                      )}
                    </View>

                    {renderTextField(
                      'referralCode',
                      i18n.t('ReferralCode'),
                      {},
                    )}

                    <CheckBox
                      value={
                        onBoardFormValues?.termsAndConditions_PrivacyPolicyCheckBox
                      }
                      onToggle={() =>
                        dispatch(
                          setOnBoardDetails({
                            termsAndConditions_PrivacyPolicyCheckBox:
                              !onBoardFormValues?.termsAndConditions_PrivacyPolicyCheckBox,
                          }),
                        )
                      }
                      childDiv={
                        <>
                          <Text style={styles.checkBoxLabel_txt}>
                            I have read and accepted the{' '}
                            <Text
                              style={styles.clickableColor_txt}
                              onPress={() => {
                                Toast.show('Under Development', {
                                  duration: Toast.durations.SHORT,
                                  position: Toast.positions.BOTTOM,
                                  shadow: true,
                                  animation: true,
                                  hideOnPress: true,
                                  delay: 0,
                                });
                              }}>
                              EQPay
                            </Text>{' '}
                            terms & conditions and privacy policy
                          </Text>
                        </>
                      }
                      error={
                        !isValid
                          ? !onBoardFormValues?.termsAndConditions_PrivacyPolicyCheckBox
                            ? i18n.t('YouMustAcceptTheTermsAndConditions')
                            : ''
                          : ''
                      }
                    />
                  </View>

                  <View>
                    <TouchableOpacity
                      style={[styles.buttonWrapper]}
                      onPress={handleSubmit}
                      // disabled={!isValid || !dirty}
                      // disabled={!isValid}
                    >
                      <LinearGradient
                        colors={
                          // !isValid || !dirty
                          !isValid ||
                          !onBoardFormValues?.termsAndConditions_PrivacyPolicyCheckBox
                            ? [colors.LightMistGray, colors.LightMistGray]
                            : [colors.appTheme, colors.appTheme]
                        }
                        style={styles.button}>
                        <Text
                          style={[
                            styles.btnText,
                            {
                              color:
                                // !isValid || !dirty
                                !isValid ? colors.LightSlateGray : colors.white,
                            },
                          ]}>
                          {i18n.t('SignUp')}
                        </Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            );
          }}
        </Formik>
      </View>
    </AuthLayout>
  );
};

export default Onboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "space-between",
    padding: 24,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'space-between',
    // backgroundColor: "red",
  },
  selectableBox_view: {
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    marginBottom: 2,
    color: colors.DimGray,
    lineHeight: 12 * 1.6,
    letterSpacing: 12 * (0 / 100),
    fontFamily: typography.Medium_500,
  },
  required: {
    color: colors.FireEngineRed,
  },
  selectableBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.LightGray,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: colors.white,
    //
    shadowColor: colors.Gainsboro,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.24,
    shadowRadius: 2,
    elevation: 2, // for Android
  },
  inputError: {
    borderColor: colors.FireEngineRed,
  },
  error: {
    color: colors.FireEngineRed,
    fontSize: 10,
    marginTop: 4,
    fontFamily: typography.Regular_400,
  },
  locationIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    marginRight: 10,
  },
  boxData_txt: {
    fontSize: 14,
    color: colors.EerieBlack,
    lineHeight: 14 * 1.4,
    letterSpacing: 14 * (0 / 100),
    fontFamily: typography.Medium_500,
    backgroundColor: colors.white,
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
    marginVertical: 24,
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
  checkBoxLabel_txt: {
    marginLeft: 8,
    fontSize: 12,
    color: colors.SimplyCharcoalDarkGray,
    lineHeight: 12 * 1.5,
    letterSpacing: 12 * (-1 / 100),
    fontFamily: typography.Medium_500,
    backgroundColor: colors.white,
  },
  clickableColor_txt: {
    color: colors.appTheme,
    textDecorationLine: 'underline',
  },
});
