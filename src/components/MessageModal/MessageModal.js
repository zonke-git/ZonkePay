import React from 'react';
import {Modal, View, Text, StyleSheet} from 'react-native';
import colors from '../../Theme/colors';
import {typography} from '../../Theme/typography';
import { i18n } from '../../localization';
import AppButton from '../AppButton/AppButton';

const MessageModal = ({visible, message, onClose, title = 'Notice'}) => {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>

          <AppButton
            buttonStyle={{marginBottom: 16}}
            title={i18n.t('OK')}
            onPress={onClose}
            // disabled={!isValid}
            useColors={[colors.appTheme, colors.appTheme]}
            // textStyle={{
            //   color: !isValid ? colors.LightSlateGray : colors.white,
            // }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default MessageModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    width: '80%',
    alignItems: 'center',
    elevation: 10,
  },
  title: {
    fontSize: 24,
    color: colors.black,
    lineHeight: 24 * 1.4,
    letterSpacing: 24 * (-1 / 100),
    fontFamily: typography.ExtraBold_800,
  },
  message: {
    fontSize: 16,
    color: colors.black,
    lineHeight: 24 * 1.4,
    letterSpacing: 24 * (-1 / 100),
    fontFamily: typography.Bold_700,
  },
  buttonWrapper: {
    width: '100%',
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
    letterSpacing: 14 * (-1 / 100),
    fontFamily: typography.Medium_500,
  },
});
