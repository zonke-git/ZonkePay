import React from 'react';
import {View} from 'react-native';
import CustomTextField from '../TextFiled/CustomTextField';
import colors from '../../Theme/colors';
import CountryPhoneInput from '../ContryCode/CountryPhoneInput';
import {i18n} from '../../localization';
import {
  formatSouthAfricanPhone,
  getSouthAfricanValidationError,
} from '../../validation/Validation';

const PhoneNumberInput = ({
  value,
  countryDetails,
  onChangePhone,
  showError,
  inputStyle,
  modalVisible,
  setModalVisible,
  label_name = i18n.t('PhoneNumber'),
}) => {
  const handlePhoneChange = text => {
    const code = countryDetails?.code;

    if (code === 'ZA') {
      const cleaned = text.replace(/\D/g, '');
      const formatted = formatSouthAfricanPhone(cleaned);
      const error = '';
      //   getSouthAfricanValidationError(cleaned);

      onChangePhone({
        phoneNo: formatted,
        phoneNoRaw: cleaned,
        error,
      });
    } else {
      const cleaned = text.replace(/\D/g, '');
      onChangePhone({
        phoneNo: text,
        phoneNoRaw: cleaned,
        error: '',
      });
    }
  };

  const maxLength =
    countryDetails?.code === 'ZA'
      ? 11
      : ['IN', 'US', 'AU'].includes(countryDetails?.code)
      ? 10
      : countryDetails?.code === 'AE'
      ? 9
      : 4;

  return (
    <View>
      <CustomTextField
        label={label_name}
        placeholder="XX XXX XXXX"
        placeholderTextColor={colors.SilverGray}
        value={value}
        onChangeText={handlePhoneChange}
        keyboardType="phone-pad"
        leftComponent={true}
        disableContrySelection={true}
        countryPhoneCode={countryDetails?.phoneCode}
        countryPhoneFlag={countryDetails?.flag}
        setOpenCountryModal={setModalVisible}
        inputStyle={inputStyle}
        error={showError}
        maxLength={maxLength}
        onBlur={() => {
          const code = countryDetails?.code;
          const cleaned = (value || '').replace(/\D/g, '');

          if (!cleaned) {
            onChangePhone({
              phoneNo: value,
              phoneNoRaw: '',
              error: 'Phone number is required',
            });
          } else if (code === 'ZA') {
            const error = getSouthAfricanValidationError(cleaned);
            onChangePhone({
              phoneNo: value,
              phoneNoRaw: cleaned,
              error,
            });
          }
        }}
      />
      <CountryPhoneInput
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </View>
  );
};

export default PhoneNumberInput;
