import React from 'react';
import {
  View,
  Text,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {typography} from '../../../Theme/typography';
import colors from '../../../Theme/colors';
import {i18n} from '../../../localization';
import DashLayout from '../../layout/DashLayout';

const Profile = () => (
  <DashLayout loader={false} showAuth={true} name="hai">
    <View style={styles.container}>
      <MenuItem label={i18n.t('Settings')} />
      <MenuItem label={i18n.t('Payment')} />
      <MenuItem label={i18n.t('PaymentHistory')} />
      <MenuItem label={i18n.t('PaymentSetting')} />
      <MenuItem label={i18n.t('Logout')} />
    </View>
  </DashLayout>
);

const MenuItem = ({label, onPress}) => (
  <TouchableOpacity
    onPress={onPress}
    style={styles.menuBox}
    activeOpacity={0.8}>
    <View style={styles.row}>
      <Text style={styles.text}>{label}</Text>
      <Image
        source={require('../../../assets/images/rightArrow.png')}
        style={styles.arrowIcon}
      />
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuBox: {
    width: '100%',
    marginBottom: 16,
    paddingVertical: 18,
    paddingHorizontal: 20,
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 0.8,
    borderColor: '#ECECEC',
    ...Platform.select({
      android: {
        elevation: 3,
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
    }),
  },
  text: {
    fontSize: 16,
    color: colors.SimplyCharcoal,
    fontFamily: typography.Medium_500,
  },
  arrowIcon: {
    width: 30,
    height: 30,
    tintColor: colors.black,
  },
});

export default Profile;
