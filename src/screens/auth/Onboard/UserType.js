import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Formik} from 'formik';
import {useUserType} from '../../../hooks';
import {i18n} from '../../../localization';
import {customerDetailsValidationSchema} from '../../schema/validationSchemas';
import {
  AppButton,
  CustomTextField,
  DropdownFieldWithModal,
} from '../../../components';
import colors from '../../../Theme/colors';
import AuthLayout from '../../layout/AuthLayout';
import {setCustomerDetails} from '../../../redux/slice/onBoardSlice';

const UserType = () => {
  const {
    customerDetails,
    userTypeOptions,
    IsLoading,

    dispatch,
    handleFormSubmit,
  } = useUserType();

  return (
    <AuthLayout title={i18n.t('HelloLetsGetYouOnboard')} loader={IsLoading}>
      <View style={styles.container}>
        <Formik
          initialValues={customerDetails}
          validationSchema={customerDetailsValidationSchema}
          enableReinitialize
          onSubmit={handleFormSubmit}>
          {({
            handleBlur,
            handleSubmit,
            setFieldValue,
            values,
            errors,
            touched,
            isValid,
          }) => (
            <View style={styles.formContainer}>
              <View>
                <CustomTextField
                  label="saId"
                  required
                  placeholder="saId"
                  placeholderTextColor={colors.SilverGray}
                  value={values?.saId}
                  onChangeText={text => {
                    const onlyNumbers = text.replace(/[^0-9]/g, '');
                    setFieldValue('saId', onlyNumbers);
                    dispatch(setCustomerDetails({saId: onlyNumbers}));
                  }}
                  onBlur={handleBlur('saId')}
                  error={touched?.saId && errors?.saId}
                  keyboardType="numeric"
                />

                <DropdownFieldWithModal
                  label={i18n.t('UserType')}
                  required
                  placeholder={i18n.t('UserType')}
                  options={userTypeOptions}
                  selectedValue={values?.type_ || ''}
                  onSelect={item => {
                    setFieldValue('type', item?.name);
                    dispatch(
                      setCustomerDetails({type: item?.name, type_: item}),
                    );
                  }}
                  getOptionLabel={item => item.name}
                  getOptionValue={item => item.name}
                  error={touched?.type && errors?.type}
                />
              </View>
              <AppButton
                onPress={handleSubmit}
                title={i18n.t('Submit')}
                useColors={
                  isValid
                    ? [colors.appTheme, colors.appTheme]
                    : [colors.LightMistGray, colors.LightMistGray]
                }
                disabled={!isValid}
                textStyle={{
                  color: isValid ? colors.white : colors.LightSlateGray,
                }}
              />
            </View>
          )}
        </Formik>
      </View>
    </AuthLayout>
  );
};

export default UserType;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
});
