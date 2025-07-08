import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
// import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

import colors from '../../Theme/colors';
import {typography} from '../../Theme/typography';
import FullScreenLoader from '../../components/Loader/FullScreenLoader';

const {height} = Dimensions.get('window');
const verticalScale = size => (height / 812) * size;

const DashLayout = ({
  title,
  subTitle = '',
  children,
  topStyle,
  fontStyle,
  loader = false,
  containerStyle,
  backButton = false,
  name = '',
  showsScrollIndicator = false,
  backButtonFunction,
  showFilter = false,
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  // const merchant_details = useSelector(
  //   state => state?.businessProfile?.merchantDetailsdata?.merchant,
  // );
  const token = useSelector(state => state?.auth?.authTokenInfo);
  const handleBack = backButtonFunction || (() => navigation.goBack());
  const [openFilterOtions, setOpenFilterOtions] = useState(false);

  // console.log('merchant_details', merchant_details);

  // useEffect(() => {
  //   dispatch(getMerchantDetails(token));
  // }, [dispatch, token]);

  return (
    <View style={{flex: 1}}>
      {/* <SafeAreaView
        style={styles.container}
        edges={['bottom', 'left', 'right']}> */}
      {loader && <FullScreenLoader />}

      <LinearGradient
        colors={[colors.AmberOrange, colors.white]}
        style={styles.pageColor}>
        <Image
          source={require('../../assets/images/appBackground/appBgUp.png')}
          style={styles.appBgUpIcon}
        />

        <View style={{flex: 1}}>
          <View style={[styles.titleView, topStyle]}>
            {name ? (
              <View style={styles.userDetailsView}>
                <View>
                  <Text style={styles.hiTxt}>{'Hi,'}</Text>
                  <Text style={styles.nameTxt}>
                    {'merchant_details?.first_name' +
                      ' ' +
                      'merchant_details?.last_name'}
                  </Text>
                </View>
                <View style={styles.iconView}>
                  <Image
                    source={require('../../assets/images/notifi.png')}
                    style={styles.notifiIcon}
                  />
                  <Image
                    source={require('../../assets/images/headPhone.png')}
                    style={styles.headPhoneIcon}
                  />
                </View>
              </View>
            ) : null}

            {backButton && (
              <TouchableOpacity onPress={handleBack}>
                <Image
                  source={require('../../assets/images/LeftArrow.png')}
                  style={styles.backButtonIcon}
                />
              </TouchableOpacity>
            )}

            <View style={styles.showTitleView}>
              {title && (
                <Text style={[styles.titleTxt, fontStyle]}>{title}</Text>
              )}
              {subTitle && <Text style={styles.subTitleTxt}>{subTitle}</Text>}
            </View>

            {showFilter && (
              <TouchableOpacity onPress={() => setOpenFilterOtions(true)}>
                <Image
                  source={require('../../assets/images/settings-sliders.png')}
                  style={styles.backButtonIcon}
                />
              </TouchableOpacity>
            )}
            {openFilterOtions && (
              <View style={styles.filterOptions}>
                <Text>Sort</Text>
              </View>
            )}
          </View>
        </View>
      </LinearGradient>

      <View style={[styles.contentView, containerStyle]}>
        {children}

        {/* <ScrollView
          showsVerticalScrollIndicator={showsScrollIndicator}
          contentContainerStyle={styles.scrollContent}>
          {children}
        </ScrollView> */}
      </View>
      {/* </SafeAreaView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  pageColor: {
    flex: 0.2,
  },
  appBgUpIcon: {
    width: 239,
    height: 212,
    resizeMode: 'contain',
    position: 'absolute',
    right: 0,
  },
  backButtonIcon: {
    width: 24,
    height: 24,
    tintColor: colors.black,
  },
  titleView: {
    flexDirection: 'row',
    paddingTop: verticalScale(68),
    paddingHorizontal: 24,
    backgroundColor: 'transparent',
  },
  showTitleView: {
    justifyContent: 'center',
    flex: 1,
  },
  titleTxt: {
    textAlign: 'center',
    fontSize: 18,
    color: colors.RichBlack,
    fontFamily: typography.SemiBold_600,
    lineHeight: 22,
    letterSpacing: 0,
  },
  subTitleTxt: {
    fontSize: 12,
    color: colors.RichBlack,
    lineHeight: 16.8,
    letterSpacing: -0.12,
    fontFamily: typography.Medium_500,
    marginTop: verticalScale(12),
  },
  contentView: {
    flex: 1,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
    backgroundColor: colors.white,
  },
  scrollContent: {
    flexGrow: 1,
    backgroundColor: 'transparent',
  },
  hiTxt: {
    fontSize: 12,
    color: colors.black,
    fontFamily: typography.Regular_400,
    lineHeight: 16.8,
    letterSpacing: -0.12,
  },
  nameTxt: {
    fontSize: 16,
    color: colors.black,
    fontFamily: typography.SemiBold_600,
    lineHeight: 22.4,
    letterSpacing: -0.16,
  },
  userDetailsView: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconView: {
    flexDirection: 'row',
  },
  notifiIcon: {
    height: 24,
    width: 24,
  },
  headPhoneIcon: {
    height: 24,
    width: 24,
    marginLeft: 16,
  },
  filterOptions: {
    position: 'absolute',
    right: 10,
    top: 100,
  },
});

export default DashLayout;
