import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import colors from '../../theme/colors';
import {typography} from '../../theme/typography';
import {
  CodeField,
  Cursor,
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
}) {
  const CELL_COUNT = CUSTOM_CELL_COUNT ?? 6;

  const ref = useBlurOnFulfill({
    value,
    cellCount: CELL_COUNT,
  });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

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
        style={[styles.input, customInputStyle, isFocused && styles.inputFocus]}
        onLayout={getCellOnLayoutHandler(index)}>
        <Text style={[styles.digits_txt, OTP_textColor]}>{child}</Text>
      </View>
    );
  };

  return (
    <>
      <CodeField
        autoFocus={true}
        textContentType="oneTimeCode"
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFiledRoot}
        keyboardType="number-pad"
        renderCell={renderCell}
      />
      {invalidOtp && <Text style={styles.InvalidOTP_txt}>{invalidOtp}</Text>}
    </>
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
  digits_txt: {
    fontSize: 24,
    color: colors.MediumGray,
    fontWeight: '500',
    fontFamily: typography.Regular_400,
  },
  InvalidOTP_txt: {
    fontSize: 12,
    color: colors.FireEngineRed,
    fontWeight: '500',
    fontFamily: typography.Regular_400,
    marginTop: 4,
  },
});

export default OtpCodeField;
