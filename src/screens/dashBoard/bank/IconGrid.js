import React from 'react';
import {View, Text, StyleSheet, Image, FlatList} from 'react-native';
import colors from '../../../theme/colors';
import LinearGradient from 'react-native-linear-gradient';

const IconGrid = ({data}) => {
  return (
    <View style={styles.container}>
      {data.map((item, index) => (
        <View key={index}>
          <LinearGradient
            colors={[colors.AmberOrange, colors.white]}
            style={styles.itemBox}>
            <Image source={item.icon} style={styles.icon} />
          </LinearGradient>
          <Text style={styles.label}>{item.name}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap', // wraps to next row
    justifyContent: 'flex-start',
    // padding: 10,
  },
  itemBox: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 6,
    // backgroundColor: colors.AmberOrange,
    borderRadius: 20,
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
