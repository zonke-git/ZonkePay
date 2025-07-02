import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import colors from '../../../Theme/colors';
import {typography} from '../../../Theme/typography';
import {useLocation} from '../../../hooks';
import AuthLayout from '../../layout/AuthLayout';
import CustomTextField from '../../../components/TextFiled/CustomTextField';
import AppButton from '../../../components/AppButton/AppButton';
import {i18n} from '../../../localization';

const Location = () => {
  const {
    searchValue,
    setSearchValue,
    handleNavigation,
    handleCurrentLocationNavigation,
    isCategoryList,
  } = useLocation();

  return (
    <AuthLayout
      title="Please Select Location"
      topStyle={{flex: 0.085}}
      fontStyle={{fontSize: 24}}
      // loader={isLoader}
    >
      <View style={styles.container}>
        {/* <CustomTextField
          showSearchIcon
          placeholder="Search by city or area name"
          placeholderTextColor={colors.NeutralGray}
          value={searchValue}
          onChangeText={text => {
            setSearchValue(text);
          }}
          style={{marginBottom: 0}}
        />
        <View style={styles.Or_View}>
          <View style={styles.semiHorizontalLine} />
          <Text style={styles.Or_Text}>Or</Text>
          <View style={styles.semiHorizontalLine} />
        </View> */}
        {/* <AppButton
          title={i18n.t('UseMyCurrentLocation')}
          onPress={handleCurrentLocationNavigation}
          useColors={[colors.appTheme, colors.appTheme]}
        /> */}

        <View style={[styles.horizontalLine, {marginTop: 24}]} />
        <Text style={styles.cityHeading_txt}>Popular Cities</Text>
        {isCategoryList?.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() => handleNavigation(item)}
              key={'@' + index}>
              <Text style={styles.cityName_txt}>{item.name}</Text>
              {isCategoryList?.length !== index + 1 && (
                <View style={styles.horizontalLine} />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </AuthLayout>
  );
};

export default Location;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "space-between",
    // alignItems: "center",
    padding: 24,
  },
  checkBoxPwd_View: {
    marginTop: 16,
    marginBottom: 26,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  forgotPwd_Text: {
    fontSize: 12,
    color: colors.appTheme,
    // fontWeight: "600",
    fontFamily: typography.Medium_500,
  },
  signup_view: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  signup_txt: {
    fontSize: 12,
    color: colors.DimGray,
    // fontWeight: "600",
    fontFamily: typography.Medium_500,
    marginBottom: 23,
  },
  buttonWrapper: {
    // position: "absolute",
    // top: 706,
    // left: 201,
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
    color: colors.white,
    // fontWeight: "bold",
    // fontWeight: "600",
    fontFamily: typography.Medium_500,
  },

  Or_View: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 16,
  },
  semiHorizontalLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.CulturedGray,
  },
  horizontalLine: {
    // flex: 1,
    width: Dimensions.get('screen'),
    height: 1,
    backgroundColor: colors.CulturedGray,
  },
  cityHeading_txt: {
    fontSize: 18,
    fontFamily: typography.SemiBold_600,
    color: colors.SimplyCharcoal,
    marginTop: 16,
    marginBottom: 24,
    lineHeight: 18 * 1.4,
    letterSpacing: 18 * (0 / 100),
  },
  cityName_txt: {
    fontSize: 14,
    fontFamily: typography.Regular_400,
    color: colors.SimplyCharcoal,
    marginVertical: 12,
  },
  Or_Text: {
    color: colors.MediumGray,
    marginHorizontal: 16,
  },
});
