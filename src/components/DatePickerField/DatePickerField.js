import React, {useState} from 'react';
import {TouchableOpacity, Text, StyleSheet, View, Image} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import colors from '../../Theme/colors';
import {typography} from '../../Theme/typography';

const DatePickerField = ({
  mode = 'date',
  onConfirm,
  onCancel,
  minimumDate,
  maximumDate,
  value,
  buttonStyle,
  textStyle,
  placeholder = 'Select date',
  placeholderTextColor = colors.SilverGray,
  display = 'default',
  label,
  required = false,
  showDateIcon = true,
  error = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleConfirm = date => {
    setIsVisible(false);
    const formattedDate = moment(date).format('DD/MM/YYYY');
    onConfirm(formattedDate);
  };

  const handleCancel = () => {
    setIsVisible(false);
    if (onCancel) {
      onCancel();
    }
  };

  const getFormattedDate = () => {
    if (!value) {
      return (
        <Text style={[styles.placeholder, {color: placeholderTextColor}]}>
          {placeholder}
        </Text>
      );
    }

    try {
      const dateObj = moment(value, 'DD/MM/YYYY');

      if (mode === 'time') {
        return dateObj.format('hh:mm A');
      } else if (mode === 'date') {
        return dateObj.format('DD/MM/YYYY');
      } else {
        return dateObj.format('DD/MM/YYYY hh:mm A');
      }
    } catch (e) {
      return value;
    }
  };

  return (
    <View style={styles.container}>
      {label && (
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.required}>*</Text>}
        </Text>
      )}
      <TouchableOpacity
        style={[
          styles.button,
          buttonStyle,
          error ? {borderColor: colors.FireEngineRed} : {},
        ]}
        onPress={() => setIsVisible(true)}>
        <Text style={[styles.text, textStyle]}>{getFormattedDate()}</Text>
        {showDateIcon && (
          <Image
            source={require('../../assets/images/Date.png')}
            style={styles.dateIcon}
          />
        )}
      </TouchableOpacity>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <DateTimePickerModal
        isVisible={isVisible}
        mode={mode}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        date={value ? moment(value, 'DD/MM/YYYY').toDate() : new Date()}
        minimumDate={minimumDate}
        maximumDate={maximumDate}
        display={display}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  button: {
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
    elevation: 2,
  },
  text: {
    flex: 1,
    fontSize: 14,
    color: colors.EerieBlack,
    lineHeight: 14 * 1.4,
    letterSpacing: 0,
    fontFamily: typography.Medium_500,
  },
  placeholder: {
    fontSize: 14,
    lineHeight: 14 * 1.4,
    letterSpacing: 0,
    fontFamily: typography.Medium_500,
  },
  label: {
    fontSize: 12,
    marginBottom: 2,
    color: colors.DimGray,
    lineHeight: 12 * 1.6,
    letterSpacing: 0,
    fontFamily: typography.Medium_500,
  },
  required: {
    color: colors.FireEngineRed,
  },
  dateIcon: {
    width: 24,
    height: 24,
  },
  errorText: {
    color: colors.FireEngineRed,
    fontSize: 12,
    marginTop: 4,
    fontFamily: typography.Regular_400,
  },
});

export default DatePickerField;
