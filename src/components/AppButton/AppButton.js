import React from 'react';
import {TouchableOpacity, Text, StyleSheet, Platform} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../Theme/colors';
import {typography} from '../../Theme/typography';

const AppButton = ({
  onPress,
  title,
  width = '100%',
  useColors = [],
  buttonStyle = {},
  textStyle = {},
  gradientStyle = {},
  disabled = false,
}) => {
  return (
    <>
      <TouchableOpacity
        style={[styles.buttonWrapper, {width}, buttonStyle]}
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.7}>
        <LinearGradient
          colors={useColors}
          style={[styles.button, gradientStyle]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}>
          <Text style={[styles.btnText, textStyle]}>{title}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  buttonWrapper: {
    width: 150,
    height: 48,
    borderRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: colors.DenimBlue,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        shadowColor: colors.DenimBlue,
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.48,
        shadowRadius: 4,
        elevation: 4,
      },
    }),
  },
  button: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: Platform.OS === 'ios' ? 0 : 10,
    paddingHorizontal: Platform.OS === 'ios' ? 0 : 24,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden', // Ensures the gradient stays within borderRadius
  },
  btnText: {
    fontSize: 14,
    color: colors.white,
    fontFamily: typography.Medium_500,
    lineHeight: 14 * 1.4,
    letterSpacing: 14 * (-1 / 100),
    ...Platform.select({
      ios: {
        // iOS typically needs slightly different text rendering
        // fontWeight: typography.Medium_500, // Medium weight
      },
    }),
  },
});

export default AppButton;
