import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import colors from '../../../theme/colors';
import LinearGradient from 'react-native-linear-gradient';
import {typography} from '../../../theme/typography';

const NAME_DATA = [
  {
    icon: require('../../../assets/images/Profile.png'),
    name: 'Alice Johnson',
  },
  {
    icon: require('../../../assets/images/Profile.png'),
    name: 'Bob Smith',
  },
  {
    icon: require('../../../assets/images/Profile.png'),
    name: 'Charlie Davis',
  },
  {
    icon: require('../../../assets/images/Profile.png'),
    name: 'Diana Prince',
  },
  {
    icon: require('../../../assets/images/Profile.png'),
    name: 'Ethan Clark',
  },
  {
    icon: require('../../../assets/images/Profile.png'),
    name: 'Fiona Lee',
  },
  {
    icon: require('../../../assets/images/Profile.png'),
    name: 'George Miller',
  },
  {
    icon: require('../../../assets/images/Profile.png'),
    name: 'Hannah Scott',
  },
];

const SendToContacts = ({
  data = [],
  layoutType = 'grid', // 'grid' or 'horizontal'
  containerStyle = {},
  itemStyle = {},
  labelStyle = {},
  gradientColors = [colors.AmberOrange, colors.white],
  showAddNew = true,
  onAddNewPress = () => {},
  handleSelectedUser = () => {},
}) => {
  // Include 'Add New' as the first item (if enabled)
  const fullData = showAddNew
    ? [{isAddNew: true}, ...NAME_DATA]
    : [...NAME_DATA];

  const renderItem = (item, index) => {
    if (item.isAddNew) {
      return (
        <TouchableOpacity
          key={`add-new-${index}`}
          onPress={onAddNewPress}
          style={styles.itemWrapper}>
          <LinearGradient
            colors={gradientColors}
            style={[styles.itemBox, itemStyle]}>
            <Image
              source={require('../../../assets/images/plus.png')}
              style={styles.plusIcon}
            />
          </LinearGradient>
          <Text style={[styles.label, labelStyle]}>Add New</Text>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        key={index}
        style={styles.itemWrapper}
        onPress={() => {
          handleSelectedUser(item);
        }}>
        <LinearGradient
          colors={gradientColors}
          style={[styles.itemBox, itemStyle]}>
          <Image source={item.icon} style={styles.icon} />
        </LinearGradient>
        <Text style={[styles.label, labelStyle]}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  if (layoutType === 'horizontal') {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[styles.horizontalContainer, containerStyle]}>
        {fullData.map(renderItem)}
      </ScrollView>
    );
  } else {
    return (
      <View style={[styles.container, containerStyle]}>
        {fullData.map(renderItem)}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  itemWrapper: {
    alignItems: 'center',
    margin: 6,
  },
  itemBox: {
    width: 55,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  plusIcon: {
    width: 30,
    height: 30,
    alignSelf: 'center',
    tintColor: colors.black,
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 4,
    alignSelf: 'center',
    tintColor: colors.black,
  },
  label: {
    fontSize: 12,
    color: colors.black,
    lineHeight: 12 * 1.4,
    letterSpacing: 12 * (-1 / 100),
    fontFamily: typography.Regular_400,
  },
});

export default SendToContacts;
