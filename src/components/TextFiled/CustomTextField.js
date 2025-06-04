/* eslint-disable no-sparse-arrays */
import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Image} from 'react-native';
import colors from '../../theme/colors';
import {typography} from '../../theme/typography';

const CustomTextField = ({
  label,
  required = false,
  placeholder,
  value,
  onChangeText,
  error,
  placeholderTextColor,
  style,
  inputStyle,
  errorStyle,
  labelStyle,
  showLeftIcon = false,
  onBlur,
  onFocus,
  multiline = false,
  numberOfLines = 1,
  secureTextEntry = false,
  keyboardType = 'default',
  showRightIcon = false,
  rightIconSource,
  onRightIconPress,
  leftComponent = null,
  countryPhoneCode,
  countryPhoneFlag,
  setOpenCountryModal,
  maxLength,
  disable = true,
}) => {
  return (
    <View style={[styles.container, style]}>
      {label && (
        <Text style={[styles.label, labelStyle]}>
          {label}
          {required && <Text style={styles.required}>*</Text>}
        </Text>
      )}
      <View
        style={[
          styles.shadowContainer,
          inputStyle,
          error && styles.inputError,
          ,
          {backgroundColor: !disable ? '#F3F3F3' : colors.white},
        ]}>
        {showLeftIcon && (
          <Image
            source={require('../../assets/images/search.png')}
            style={styles.leftIcon}
          />
        )}
        {leftComponent && (
          <>
            <TouchableOpacity
              onPress={() => setOpenCountryModal(true)}
              style={styles.countryContainer}>
              <Text style={styles.countryCodeFlag}>{countryPhoneFlag}</Text>
              <Text
                style={styles.countryCodeText}>{`(${countryPhoneCode})`}</Text>
            </TouchableOpacity>
            <View style={styles.verticalLine} />
          </>
        )}
        <TextInput
          style={[styles.input]}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          value={value}
          onChangeText={text => {
            const noLeadingSpace = text.replace(/^\s+/, '');
            onChangeText(noLeadingSpace);
          }}
          onBlur={onBlur}
          onFocus={onFocus}
          multiline={multiline}
          numberOfLines={numberOfLines}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          maxLength={maxLength}
          editable={disable}
        />
        {showRightIcon && rightIconSource && (
          <TouchableOpacity onPress={onRightIconPress}>
            <Image source={rightIconSource} style={styles.rightIcon} />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={[styles.error, errorStyle]}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
  shadowContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.LightGray,
    borderRadius: 10,
    backgroundColor: colors.white,
    alignItems: 'center',
    paddingHorizontal: 14,
    height: 46,
    shadowColor: colors.Gainsboro,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.24,
    shadowRadius: 2,
    elevation: 2, // for Android
  },
  leftIcon: {
    width: 16.27,
    height: 16.27,
    marginRight: 2.5,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: colors.EerieBlack,
    lineHeight: 14 * 1.4,
    letterSpacing: 14 * (0 / 100),
    fontFamily: typography.Medium_500,
  },
  inputError: {
    borderColor: colors.FireEngineRed,
  },
  rightIcon: {
    width: 16,
    height: 16,
    marginLeft: 8,
  },
  error: {
    color: colors.FireEngineRed,
    fontSize: 10,
    marginTop: 4,
    fontFamily: typography.Regular_400,
  },

  countryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countryCodeFlag: {
    fontSize: 20,
    color: colors.EerieBlack,
    lineHeight: 14 * 1.4,
    letterSpacing: 14 * (0 / 100),
    fontFamily: typography.Medium_500,
    marginRight: 10,
  },
  countryCodeText: {
    fontSize: 14,
    color: colors.EerieBlack,
    lineHeight: 14 * 1.4,
    letterSpacing: 14 * (0 / 100),
    fontFamily: typography.Medium_500,
    marginRight: 12,
  },
  verticalLine: {
    width: 1,
    height: '100%', // Or use a fixed height like 25
    backgroundColor: '#EDF1F3',
    // marginHorizontal: 8,
    alignSelf: 'center',
    marginRight: 10,
  },
});

export default CustomTextField;
