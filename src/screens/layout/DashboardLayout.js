import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import colors from '../../Theme/colors';
import {typography} from '../../Theme/typography';
import FullScreenLoader from '../../components/Loader/FullScreenLoader';
import LinearGradient from 'react-native-linear-gradient';
import CustomTextField from '../../components/TextFiled/CustomTextField';
import {i18n} from '../../localization';

const {height} = Dimensions.get('window');
const verticalScale = size => (height / 812) * size;

const DashboardLayout = ({
  title = '',
  subTitle = '',
  children,
  topStyle,
  fontStyle,
  loader = false,
  containerStyle,
  showAuth = false,
  backButton = false,
  handleBack,
  showFilter = false,
}) => {
  const [searchValue, setSearchValue] = useState();
  return (
    <LinearGradient
      colors={[colors.AmberOrange, colors.white]}
      style={styles.gradientContainer}>
      <SafeAreaView
        style={styles.container}
        edges={['bottom', 'left', 'right']}>
        {loader && <FullScreenLoader />}

        {/* Main Content */}
        <View style={styles.mainContent}>
          <LinearGradient
            colors={[colors.AmberOrange, colors.white]}
            style={styles.header_container}>
            <>
              <Image
                source={require('../../assets/images/appBackground/appBgUp.png')}
                style={styles.appBgUpIcon}
              />
              {showAuth && (
                <View style={styles.profile_search_view}>
                  <View>
                    <Image
                      source={require('../../assets/images/account.png')}
                      style={styles.profileIcon}
                    />
                  </View>

                  <CustomTextField
                    showLeftIcon
                    placeholder="Pay by name or phone"
                    placeholderTextColor={colors.NeutralGray}
                    value={searchValue}
                    onChangeText={text => {
                      setSearchValue(text);
                    }}
                    style={styles.searchBox}
                    inputStyle={styles.searchBoxInputStyle}
                  />
                  {/* <LinearGradient
                colors={[colors.white, colors.AmberOrange]}
                style={styles.arrowIconPress}>
                <TouchableOpacity>
                  <Image
                    source={require('../../assets/images/arrows.png')}
                    style={styles.arrowIcon}
                  />
                </TouchableOpacity>
              </LinearGradient> */}
                </View>
              )}
            </>
            {/* Title Section */}
            <View style={[styles.titleView, topStyle]}>
              <View style={styles.backArrowTitleTxt}>
                {backButton && (
                  <TouchableOpacity onPress={handleBack}>
                    <Image
                      source={require('../../assets/images/backArrow.png')}
                      style={styles.backIcon}
                    />
                  </TouchableOpacity>
                )}
                {title && (
                  <Text style={[styles.titleTxt, fontStyle]}>{title}</Text>
                )}
              </View>
              {subTitle && <Text style={styles.subTitleTxt}>{subTitle}</Text>}
            </View>
            {showFilter && (
              <Image
                source={require('../../assets/images/panel.png')}
                style={styles.filtercon}
              />
            )}
          </LinearGradient>
          {/* Scrollable Content View */}
          <View style={[styles.contentView, containerStyle]}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContent}>
              {children}
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  mainContent: {
    flex: 1,
  },
  header_container: {
    flexDirection: 'row',
    paddingTop: verticalScale(68),
    paddingHorizontal: 24,
    alignItems: 'center',
    // flex: 1,
    paddingBottom: verticalScale(32),
  },
  profile_search_view: {
    // flex: 1,
    // width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  profileIcon: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },
  arrowIconPress: {
    backgroundColor: colors.dimColor,
    padding: 4,
    borderRadius: 30,
  },
  arrowIcon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  backIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 10,
    tintColor: colors.black,
  },
  filtercon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    marginRight: 10,
    tintColor: colors.black,
  },
  appBgUpIcon: {
    width: 239,
    height: 212,
    resizeMode: 'contain',
    position: 'absolute',
    right: 0,
    tintColor: colors.white,
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
    width: '85%',

    backgroundColor: 'transparent',
  },
  backArrowTitleTxt: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleTxt: {
    fontSize: 22,
    color: colors.black,
    fontFamily: typography.SemiBold_600,
    lineHeight: 32 * 1.3,
    letterSpacing: 32 * (-2 / 100),
  },
  subTitleTxt: {
    fontSize: 12,
    color: colors.white,
    lineHeight: 12 * 1.4,
    letterSpacing: 12 * (-1 / 100),
    fontFamily: typography.Medium_500,
    marginTop: verticalScale(12),
  },
  contentView: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20, // Add some padding at the bottom
  },
  searchBox: {
    marginBottom: 0,
    flex: 1,
    marginHorizontal: 15,
  },
  searchBoxInputStyle: {
    // flex: 1,
    backgroundColor: colors.DimGray,
  },
});

export default DashboardLayout;
