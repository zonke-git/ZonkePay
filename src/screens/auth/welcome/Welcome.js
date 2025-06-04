import React from 'react';
import {ScrollView, TouchableOpacity} from 'react-native';
import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Carousel from 'react-native-reanimated-carousel';
import {SafeAreaView} from 'react-native-safe-area-context';
import colors from '../../../theme/colors';
import {typography} from '../../../theme/typography';
import {useWelcome} from '../../../hooks';
import {i18n} from '../../../localization';

const {width} = Dimensions.get('window');

const CarouselData = [
  {
    id: 1,
    name: 'first',
    image: require('../../../assets/images/onBoarding/EQ-Pay-is-a-Scan-Pay.png'),
    title: 'Create your free storefront in minutes',
    content:
      'EQ Pay is a Scan & Pay Mobile App. The power to customise your CashBack and GiveBack is now in your control.',
  },
  {
    id: 2,
    name: 'second',
    image: require('../../../assets/images/onBoarding/Pay-across-merchants.png'),
    title: 'Accept wallet payments easily',
    content:
      'Pay across merchants which include Restaurants, Supermarkets, Fashion, Medical and more.',
  },
  {
    id: 3,
    name: 'third',
    image: require('../../../assets/images/onBoarding/EQ-Pay-helps-you.png'),
    title: 'Increase loyalty and repeat buys',
    content:
      'EQ Pay helps you find your charitable purpose and empowers you to GiveBack.',
  },
  {
    id: 4,
    name: 'fourth',
    image: require('../../../assets/images/onBoarding/Browse-the-App.png'),
    title: 'Increase loyalty and repeat buys',
    content:
      'Browse the App for never before seen offers with up to 50% off CashBack and GiveBack form partner outlets',
  },
  {
    id: 5,
    name: 'fifth',
    image: require('../../../assets/images/onBoarding/Make-every-payments-count.png'),
    title: 'Increase loyalty and repeat buys',
    content:
      'Make every payments count. EQ Pay guarantees to safeguard your complete privacy and will not share any of your information.',
  },
];

const Welcome = () => {
  const {
    activeIndex,
    carouselRef,
    setActiveIndex,
    welcomeMessage,
    handleWelcomeScreen,
    handleIndexChange,
    handleNavigation,
  } = useWelcome();

  return (
    <>
      <SafeAreaView
        style={styles.container}
        edges={['bottom', 'left', 'right']}>
        <ScrollView
          contentContainerStyle={styles.scrollViewContainer}
          showsVerticalScrollIndicator={false}>
          <>
            {/* {welcomeMessage ? (
              <View style={styles.welcome_view}>
                <View>
                  <View style={styles.welcome_img_view}>
                    <Image
                      source={require('../../../assets/images/onBoarding/Zonke.png')}
                      style={styles.image_size}
                    />
                  </View>
                  <View style={styles.welcome_msg_view}>
                    <Text style={styles.welcome_txt}>
                      {i18n.t('welcome_message')}
                    </Text>
                    <Text style={styles.welcome_content_txt}>
                      {i18n.t(
                        'SouthAfricasNewAgeMerchantPaymentandStorefrontPlatform',
                      )}
                    </Text>
                    <Text style={styles.welcome_content_msg_txt}>
                      {i18n.t(
                        'GetstartedInMinutesAndEnjoyBuilt_inLoyaltyAandCashbackToolsToGrowYourBusiness',
                      )}
                    </Text>
                  </View>
                </View>

                <TouchableOpacity
                  style={[styles.buttonWrapper, {width: 'full'}]}
                  onPress={handleWelcomeScreen}>
                  <LinearGradient
                    colors={[colors.appTheme, colors.appTheme]}
                    style={styles.button}>
                    <Text style={styles.btnText}>{i18n.t('Next')}</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            ) : ( */}
            <>
              <View>
                <Carousel
                  ref={carouselRef}
                  style={{alignSelf: 'center'}}
                  width={width * 0.9}
                  height={width * 0.9}
                  data={CarouselData}
                  scrollAnimationDuration={1000}
                  onSnapToItem={index => setActiveIndex(index)}
                  renderItem={({item}) => (
                    <View style={styles.item}>
                      <Image source={item?.image} style={styles.image_size} />
                    </View>
                  )}
                />
                {/* Dots */}
                <View style={styles.pagination}>
                  {CarouselData.map((_, index) => (
                    <View
                      key={index}
                      style={[
                        styles.dot,
                        activeIndex === index
                          ? styles.activeDot
                          : styles.inactiveDot,
                      ]}
                    />
                  ))}
                </View>
                {/* <Text style={styles.title_txt}>
                  {CarouselData[activeIndex]?.title}
                </Text> */}
                <Text style={styles.content_txt}>
                  {CarouselData[activeIndex]?.content}
                </Text>
              </View>
              {activeIndex < 4 ? (
                <View style={styles.btnView}>
                  <TouchableOpacity
                    style={styles.buttonWrapper}
                    onPress={() => {
                      handleIndexChange(4);
                    }}>
                    <LinearGradient
                      colors={[colors.white, colors.white]}
                      style={styles.button}>
                      <Text style={[styles.btnText, {color: colors.DimGray}]}>
                        {i18n.t('Skip')}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.buttonWrapper}
                    onPress={() => handleIndexChange(activeIndex + 1)}>
                    <LinearGradient
                      colors={[colors.appTheme, colors.appTheme]}
                      style={styles.button}>
                      <Text style={styles.btnText}>{i18n.t('Next')}</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  style={[styles.buttonWrapper, {width: 'full'}]}
                  onPress={handleNavigation}>
                  <LinearGradient
                    colors={[colors.appTheme, colors.appTheme]}
                    style={styles.button}>
                    <Text style={styles.btnText}>{i18n.t('GetStarted')}</Text>
                  </LinearGradient>
                </TouchableOpacity>
              )}
            </>
            {/* )} */}
          </>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    // justifyContent: "space-between",
    // paddingTop: "80%",
    padding: 0,
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 24,
    paddingTop: 80,
  },
  welcome_view: {
    flex: 1,
    justifyContent: 'space-between',
    // alignItems: "center",
    // alignContent: "center",
    // alignSelf: "center",
  },
  welcome_img_view: {
    // justifyContent: "center",
    // alignItems: "center",
    aspectRatio: 272 / 310,
  },
  welcome_msg_view: {
    width: '85%',
    // alignContent: "center",
    // backgroundColor: "red",
    alignSelf: 'center',
    marginTop: 16,
  },
  welcome_txt: {
    fontSize: 24,
    color: colors.DeepOrange,
    textAlign: 'center',
    fontFamily: typography.Bold_700,
    lineHeight: 24 * 1.2, // This is 150%
    marginBottom: 12,
  },
  welcome_content_txt: {
    fontSize: 16,
    color: colors.SimplyCharcoal,
    textAlign: 'center',
    fontFamily: typography.SemiBold_600,
    lineHeight: 16 * 1.5,
    marginBottom: 8,
  },
  welcome_content_msg_txt: {
    fontSize: 14,
    color: colors.CharcoalGray,
    textAlign: 'center',
    marginBottom: 8,
    fontFamily: typography.Regular_400,
    lineHeight: 14 * 1.5,
  },
  item: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
    aspectRatio: 310 / 310,
    // padding: 20,
    // marginHorizontal: 10,
  },
  image_size: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    // marginBottom: 20,
  },
  title_txt: {
    fontSize: 16,
    color: colors.SimplyCharcoal,
    textAlign: 'center',
    fontFamily: typography.SemiBold_600,
    lineHeight: 16 * 1.5,
    marginBottom: 8,
  },
  content_txt: {
    fontSize: 14,
    color: colors.CharcoalGray,
    textAlign: 'center',
    fontFamily: typography.Regular_400,
    lineHeight: 14 * 1.5,
  },
  btnView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonWrapper: {
    // position: "absolute",
    // top: 706,
    // left: 201,
    width: 150,
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
    fontFamily: typography.Medium_500,
    lineHeight: 14 * 1.4,
    letterSpacing: 14 * (-1 / 100),
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 24,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    width: 20,
    backgroundColor: colors.appTheme,
  },
  inactiveDot: {
    backgroundColor: colors.LightGray,
  },
});

export default Welcome;
