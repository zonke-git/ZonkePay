import React from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import SuccessfullyLayout from '../layout/SuccessfullyLayout';
import colors from '../../Theme/colors';
import {i18n} from '../../localization';
import {typography} from '../../Theme/typography';

const MpinCreatedSuccessfully = () => {
  const navigation = useNavigation();
  return (
    <SuccessfullyLayout>
      <View style={styles.container}>
        <View style={{alignItems: 'center'}}>
          <FastImage
            source={require('../../assets/images/success.gif')}
            style={styles.tickIcon}
            resizeMode={FastImage.resizeMode.contain}
          />
          <Text style={styles.successText}>
            {`MPIN ${i18n.t('CreatedSuccessfully')}!`}
          </Text>
        </View>
        <View style={styles.btnView}>
          <TouchableOpacity
            style={styles.buttonWrapper}
            onPress={() => {
              navigation.navigate('MainApp');
            }}>
            <LinearGradient
              colors={[colors.appTheme, colors.appTheme]}
              style={styles.button}>
              <Text style={styles.btnText}>{i18n.t('Done')}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </SuccessfullyLayout>
  );
};

export default MpinCreatedSuccessfully;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 24,
    alignItems: 'center',
    paddingHorizontal: 24,
    justifyContent: 'space-between',
  },
  tickIcon: {
    width: 250,
    height: 250,
  },
  successText: {
    fontSize: 20,
    lineHeight: 36,
    // letterSpacing: 12 * (0 / 100),
    color: colors.RichBlack,
    fontFamily: typography.SemiBold_600,
    marginBottom: 2,
  },

  btnView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  buttonWrapper: {
    width: '100%',
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 23,
  },
  btnText: {
    fontSize: 14,
    color: colors.white,
    fontFamily: typography.Medium_500,
    lineHeight: 14 * 1.4,
    letterSpacing: 14 * (-1 / 100),
  },
});
