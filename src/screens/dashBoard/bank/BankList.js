import React from 'react';
import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';
import {typography} from '../../../theme/typography';
import colors from '../../../theme/colors';

const banks = [
  {name: 'HDFC', icon: require('../../../assets/images/bank.png')},
  {name: 'SBI', icon: require('../../../assets/images/bank.png')},
  {name: 'ICICI', icon: require('../../../assets/images/bank.png')},
  {name: 'Axis', icon: require('../../../assets/images/bank.png')},
  {name: 'Kotak', icon: require('../../../assets/images/bank.png')},
];

const BankList = () => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.bankListContainer}>
        {banks.map((bank, index) => (
          <View key={index} style={styles.bankBox}>
            <Image source={bank.icon} style={styles.bankIcon} />
            <Text style={styles.bankName}>{bank.name}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
  bankListContainer: {
    // paddingHorizontal: 16,
    // paddingVertical: 20,
  },
  bankBox: {
    width: 84,
    height: 84,
    marginRight: 12,
    backgroundColor: '#EEF7FB',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  bankIcon: {
    width: 34,
    height: 34,
    marginBottom: 6,
    resizeMode: 'contain',
  },
  bankName: {
    fontSize: 12,
    textAlign: 'center',
    fontFamily: typography.Medium_500,
    color: colors.black,
  },
});

export default BankList;
