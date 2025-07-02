import React, {useEffect, useRef} from 'react';
import {StyleSheet, Text, View, Keyboard} from 'react-native'; // Import Keyboard
import colors from '../../Theme/colors';
import {typography} from '../../Theme/typography';
import {
  CodeField,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

function OtpCodeField({
  value,
  setValue,
  invalidOtp,
  CUSTOM_CELL_COUNT,
  showValues = true,
  customInputStyle,
  OTP_textColor,
  spacebetween = {marginHorizontal: 14},
  autoFocus = true,
  shouldAutoFocus = false, // explicitly trigger auto-focus
}) {
  const CELL_COUNT = CUSTOM_CELL_COUNT ?? 6;

  // Use useBlurOnFulfill to get the ref for the CodeField
  // This ref is crucial for programmatically blurring (closing keyboard)
  const codeFieldRef = useBlurOnFulfill({
    value,
    cellCount: CELL_COUNT,
  });

  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  // Use useEffect to focus the CodeField when shouldAutoFocus changes
  useEffect(() => {
    if (shouldAutoFocus && codeFieldRef.current) {
      codeFieldRef.current.focus();
    }
  }, [codeFieldRef, shouldAutoFocus]);

  // New useEffect to dismiss keyboard when OTP is fully filled
  useEffect(() => {
    if (value.length === CELL_COUNT) {
      Keyboard.dismiss(); // Dismiss the keyboard
      // Optionally, you might want to blur the field as well
      // if (codeFieldRef.current) {
      //   codeFieldRef.current.blur();
      // }
    }
  }, [value, CELL_COUNT]);

  const renderCell = ({index, symbol, isFocused}) => {
    let child;

    if (symbol) {
      child = <Text>{showValues ? symbol : '•'}</Text>;
    } else if (isFocused) {
      child = '|'; // Static cursor
    } else {
      child = '-';
    }

    return (
      <View
        key={index}
        style={[
          styles.input,
          spacebetween,
          customInputStyle,
          isFocused && styles.inputFocus,
          // invalidOtp && styles.invalidInput, // Add invalidInput style when invalid
        ]}
        onLayout={getCellOnLayoutHandler(index)}>
        <Text style={[styles.digits_txt, OTP_textColor]}>{child}</Text>
      </View>
    );
  };

  return (
    <View>
      <CodeField
        autoFocus={autoFocus}
        textContentType="oneTimeCode"
        ref={codeFieldRef} // Assign the ref from useBlurOnFulfill
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFiledRoot}
        keyboardType="number-pad"
        renderCell={renderCell}
      />
      <View style={styles.errorView}>
        {invalidOtp && <Text style={styles.InvalidOTP_txt}>{invalidOtp}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  codeFiledRoot: {},
  input: {
    width: 48,
    height: 57,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderRadius: 16,
    borderColor: colors.VeryLightGray,
  },
  inputFocus: {
    borderColor: colors.appTheme,
  },
  invalidInput: {
    borderColor: colors.FireEngineRed, // Style for invalid OTP
  },
  digits_txt: {
    fontSize: 24,
    color: colors.MediumGray,
    fontWeight: '500',
    fontFamily: typography.Regular_400,
  },
  errorView: {
    width: '100%',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
  },
  InvalidOTP_txt: {
    fontSize: 14,
    color: colors.FireEngineRed,
    fontWeight: '500',
    fontFamily: typography.Regular_400,
    marginTop: 4,
    textAlign: 'left',
  },
});

export default OtpCodeField;
