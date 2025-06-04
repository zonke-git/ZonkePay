import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../../theme/colors';
import {typography} from '../../theme/typography';

const CheckBox = ({
  label,
  value,
  onToggle,
  labelStyle,
  containerStyle,
  childDiv,
  error,
}) => {
  return (
    <>
      <Pressable style={[styles.container, containerStyle]} onPress={onToggle}>
        <View style={[styles.checkbox, value && styles.checked]}>
          {value && <MaterialIcons name="check" size={12} color="#fff" />}
        </View>
        {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
        {childDiv}
      </Pressable>
      {error && <Text style={[styles.error]}>{error}</Text>}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    marginLeft: 8,
    fontSize: 12,
    color: '#6F6F6F',
  },
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 2.67,
    borderWidth: 1,
    borderColor: '#8F8F8F',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  checked: {
    backgroundColor: '#FA5117',
    borderColor: '#FA5117',
  },
  error: {
    color: colors.FireEngineRed,
    fontSize: 10,
    marginTop: 4,
    fontFamily: typography.Regular_400,
  },
});

export default CheckBox;
