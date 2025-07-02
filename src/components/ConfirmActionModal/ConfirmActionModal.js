import React from 'react';
import {Modal, View, Text, Image, StyleSheet} from 'react-native';
import colors from '../../Theme/colors';
import {typography} from '../../Theme/typography';
import {i18n} from '../../localization';
import AppButton from '../AppButton/AppButton';

const ConfirmActionModal = ({
  visible,
  onCancel,
  onConfirm,
  title,
  confirmText = 'Confirm',
  cancelText = i18n.t('Cancel'),
  icon = require('../../assets/images/Alter.png'),
}) => {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onCancel}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {icon && <Image source={icon} style={styles.alterIcon} />}
          <Text style={styles.title}>{title}</Text>

          <View style={[styles.btnView, {}]}>
            <AppButton
              onPress={onCancel}
              title={cancelText}
              useColors={[colors.white, colors.white]}
              textStyle={{color: colors.appTheme}}
              buttonStyle={[styles.modalBtnStyles, styles.preBtnStyles]}
            />
            <AppButton
              onPress={onConfirm}
              title={confirmText}
              useColors={[colors.appTheme, colors.appTheme]}
              textStyle={{color: colors.white}}
              buttonStyle={styles.modalBtnStyles}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmActionModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 10,
    margin: 24,
  },
  title: {
    fontSize: 20,
    color: colors.black,
    lineHeight: 24,
    letterSpacing: 20 * (0 / 100),
    fontFamily: typography.Bold_700,
  },
  alterIcon: {
    width: 90,
    height: 80,
    marginBottom: 24,
  },
  modalBtnStyles: {
    width: '45%',
  },

  btnView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 5,
    marginTop: 24,
    width: '100%',
  },
  preBtnStyles: {
    borderWidth: 1,
    borderColor: colors.appTheme,
  },
});
