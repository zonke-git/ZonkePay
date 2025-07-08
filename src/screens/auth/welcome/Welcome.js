import React from 'react';
import {ScrollView} from 'react-native';
import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';
// import Carousel from 'react-native-reanimated-carousel';
import {SafeAreaView} from 'react-native-safe-area-context';
import colors from '../../../Theme/colors';
import {useWelcome} from '../../../hooks';
import {i18n} from '../../../localization';
import {typography} from '../../../Theme/typography';
import AppButton from '../../../components/AppButton/AppButton';

const {width} = Dimensions.get('window');

const CarouselData = [
  {
    id: 1,
    name: 'first',
    image: require('../../../assets/images/onBoarding/Thrift-shop-cuate.png'),
    title: 'Receive and Send Money Instantly',
    content:
      ' Use ZonkePay to pay friends, family, or businesses in real time. Enjoy fast, secure peer-to-peer transfers and simplified payments with QR codes.',
  },
  {
    id: 2,
    name: 'second',
    image: require('../../../assets/images/onBoarding/E-Wallet-bro.png'),
    title: 'Manage and Access Your Money',
    content:
      'Top up your wallet from your bank account or card, withdraw money anytime, track your balance, and view all your transactions in one place.',
  },
  // {
  //   id: 3,
  //   name: 'third',
  //   image: require('../../../assets/images/onBoarding/Business-growth-amico.png'),
  //   title: 'Increase loyalty and repeat buys',
  //   content:
  //     'Drive repeat sales by offering cashback and loyalty rewards. Encourage return visits and build stronger relationships with your customers.',
  // },
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
            {welcomeMessage ? (
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
                    <Text style={styles.welcome_content_msg_txt}>
                      {i18n.t(
                        'AfricasSecureAllInOneDigitalWalletAndPaymentApp',
                      )}
                    </Text>
                    <Text style={styles.welcome_content_msg_txt}>
                      {i18n.t(
                        'SetUpYourAccountInMinutesAndStartManagingYourMoneyReceivingPaymentsAndSendingFundsWithEase',
                      )}
                    </Text>
                  </View>
                </View>

                <AppButton
                  onPress={handleWelcomeScreen}
                  title={i18n.t('Next')}
                  useColors={[colors.appTheme, colors.appTheme]}
                  // Optional props:
                  // width="90%"
                  // buttonStyle={{marginTop: 20}}
                  // textStyle={{fontSize: 18}}
                  // gradientStyle={{borderRadius: 10}}
                />
              </View>
            ) : (
              <>
                <View>
                  {/* <Carousel
                    ref={carouselRef}
                    style={{alignSelf: 'center'}}
                    width={width * 0.9}
                    height={width * 0.9}
                    data={CarouselData}
                    scrollAnimationDuration={1000}
                    onSnapToItem={index => setActiveIndex(index)}
                    panGestureHandlerProps={{
                      enabled: false, // 👈 This disables swipe gestures
                    }}
                    renderItem={({item}) => (
                      <View style={styles.item}>
                        <Image source={item?.image} style={styles.image_size} />
                      </View>
                    )}
                  /> */}
                  <View style={styles.item}>
                    <Image
                      source={CarouselData[activeIndex]?.image}
                      style={styles.image_size}
                    />
                  </View>
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
                  <Text style={styles.title_txt}>
                    {CarouselData[activeIndex]?.title}
                  </Text>
                  <Text style={styles.content_txt}>
                    {CarouselData[activeIndex]?.content}
                  </Text>
                </View>
                {activeIndex < 1 ? (
                  <View style={styles.btnView}>
                    <AppButton
                      width={'45%'}
                      onPress={() => handleIndexChange(1)}
                      title={i18n.t('Skip')}
                      useColors={[colors.white, colors.white]}
                      textStyle={{color: colors.DimGray}}
                    />

                    <AppButton
                      width={'45%'}
                      onPress={() => handleIndexChange(activeIndex + 1)}
                      title={i18n.t('Next')}
                      useColors={[colors.appTheme, colors.appTheme]}
                    />
                  </View>
                ) : (
                  <AppButton
                    onPress={handleNavigation}
                    title={i18n.t('GetStarted')}
                    useColors={[colors.appTheme, colors.appTheme]}
                  />
                )}
              </>
            )}
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
  },
  welcome_img_view: {
    aspectRatio: 272 / 310,
    // aspectRatio: 238 / 286,
  },
  welcome_msg_view: {
    // width: '100%',
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
    // marginBottom: 8,
    fontFamily: typography.Medium_500,
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
  },
  image_size: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
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
