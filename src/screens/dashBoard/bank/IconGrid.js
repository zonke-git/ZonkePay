import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';
import colors from '../../../Theme/colors';
import LinearGradient from 'react-native-linear-gradient';

const DATA = [
  {icon: require('../../../assets/images/scanner.png'), name: 'Scan & Pay'},
  {icon: require('../../../assets/images/contact.png'), name: 'Pay Contact'},
  {
    icon: require('../../../assets/images/telephone.png'),
    name: 'Phone Number',
  },
  {icon: require('../../../assets/images/bank.png'), name: 'Bank Transfe'},
  {
    icon: require('../../../assets/images/face-scan.png'),
    name: 'Pay Virtual ID',
  },
  {
    icon: require('../../../assets/images/bank-transfer.png'),
    name: 'Self Transfer',
  },
  {
    icon: require('../../../assets/images/flash.png'),
    name: 'Electricity Bills',
  },
  {
    icon: require('../../../assets/images/mobile.png'),
    name: 'Mobile Recharge',
  },
  // add more items...
];

const IconGrid = ({
  data = [],
  layoutType = 'grid', // 'grid' or 'horizontal'
  containerStyle = {},
  itemStyle = {},
  labelStyle = {},
  gradientColors = [colors.AmberOrange, colors.white],
}) => {
  const renderItem = (item, index) => (
    <View key={index} style={styles.itemWrapper}>
      <LinearGradient
        colors={gradientColors}
        style={[styles.itemBox, itemStyle]}>
        <Image source={item.icon} style={styles.icon} />
      </LinearGradient>
      <Text style={[styles.label, labelStyle]}>{item.name}</Text>
    </View>
  );

  if (layoutType === 'horizontal') {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[styles.horizontalContainer, containerStyle]}>
        {DATA.map(renderItem)}
      </ScrollView>
    );
  } else {
    return (
      <View style={[styles.container, containerStyle]}>
        {DATA.map(renderItem)}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap', // wraps to next row
    justifyContent: 'flex-start',
    // padding: 10,
  },

  itemWrapper: {
    alignItems: 'center',
    margin: 6,
  },
  itemBox: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    // margin: 6,
    borderRadius: 20,
    // backgroundColor: colors.AmberOrange,
    // padding: 15,
  },
  icon: {
    width: 32,
    height: 32,
    marginBottom: 4,
    alignSelf: 'center',
    tintColor: colors.black,
  },
  label: {
    fontSize: 12,
    textAlign: 'center',
    // width: '40%',
    marginHorizontal: 10,
  },
});

export default IconGrid;
