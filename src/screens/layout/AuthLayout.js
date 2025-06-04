import React from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import colors from '../../theme/colors';
import {typography} from '../../theme/typography';
import FullScreenLoader from '../../components/Loader/FullScreenLoader';

const AuthLayout = ({
  title = 'Welcome',
  subTitle = '',
  children,
  topStyle,
  fontStyle,
  loader = false,
  containerStyle,
}) => {
  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      {loader && <FullScreenLoader />}
      {/* Background Images */}
      <Image
        source={require('../../assets/images/appBackground/appBgUp.png')}
        style={styles.appBgUpIcon}
      />
      <Image
        source={require('../../assets/images/appBackground/appBgDown.png')}
        style={styles.appBgDownIcon}
      />

      {/* Title Section */}
      <View style={[styles.titleView, topStyle]}>
        {title && <Text style={[styles.titleTxt, fontStyle]}>{title}</Text>}
        {subTitle && <Text style={styles.subTitleTxt}>{subTitle}</Text>}
      </View>

      {/* Scrollable Content View */}
      <View style={[styles.contentView, containerStyle]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>
          {children}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.appTheme,
    // justifyContent: "space-between",
    // paddingTop: "80%",
  },
  appBgUpIcon: {
    width: 239,
    height: 212,
    resizeMode: 'contain',
    position: 'absolute',
    right: 0,
  },
  appBgDownIcon: {
    width: 193,
    height: 171,
    resizeMode: 'contain',
    position: 'absolute',
    left: 0,
    top: 101,
  },
  titleView: {
    flex: 0.17,
    width: '85%',
    marginTop: 68,
    paddingHorizontal: 24,
  },
  titleTxt: {
    fontSize: 32,
    color: colors.white,
    textAlignVertical: 'center',
    fontFamily: typography.Bold_700,
    lineHeight: 32 * 1.3,
    letterSpacing: 32 * (-2 / 100),
  },
  subTitleTxt: {
    fontSize: 12,
    color: colors.white,
    lineHeight: 12 * 1.4,
    letterSpacing: 12 * (-1 / 100),
    fontFamily: typography.Medium_500,
    marginTop: 12,
  },
  contentView: {
    flex: 1,
    backgroundColor: colors.white,
    // top: 184,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
  },
  scrollContent: {
    flexGrow: 1,
  },
});

export default AuthLayout;
