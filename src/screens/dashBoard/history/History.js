import React, {useCallback} from 'react';
import {View, Text, FlatList, StyleSheet, Image} from 'react-native';
import DashboardLayout from '../../layout/DashboardLayout';
import {useHistory} from '../../../hooks/history/use-History';
import colors from '../../../theme/colors';
import {typography} from '../../../theme/typography';

const History = () => {
  const {historyData, handleBack} = useHistory();

  const renderItem = useCallback(
    ({item, index}) => (
      <View style={styles.listView}>
        <View style={styles.rowView}>
          <Image
            source={require('../../../assets/images/account.png')}
            style={styles.profilePic}
          />
          <View style={styles.nameContent}>
            <Text style={styles.contentNameText}>Amazon Pantry</Text>
            <View style={styles.rowView}>
              <Text style={[styles.contentText, {marginRight: 10}]}>
                01 Jan
              </Text>
              <Text style={styles.contentText}>Subscription payment</Text>
            </View>
          </View>
        </View>
        <Text
          style={[
            styles.amountText,
            {color: index % 2 ? colors.appTheme : colors.gradientGreen},
          ]}>
          -1,000
        </Text>
      </View>
    ),
    [],
  );

  return (
    <DashboardLayout
      title="History"
      loader={false}
      backButton={true}
      handleBack={handleBack}
      showFilter={true}>
      <FlatList
        data={historyData}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
    </DashboardLayout>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
  },
  itemContainer: {
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },

  listView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },

  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 30,
    marginRight: 10,
  },
  nameContent: {},
  contentNameText: {
    fontSize: 14,
    color: colors.black,
    lineHeight: 14 * 1.4,
    letterSpacing: 14 * (0 / 100),
    fontFamily: typography.Medium_500,
    marginBottom: 2,
  },
  contentText: {
    textAlign: 'center',
    fontSize: 14,
    color: colors.DimGray,
    lineHeight: 14 * 1.4,
    letterSpacing: 12 * (-1 / 100),
    fontFamily: typography.Regular_400,
    // marginBottom: 20,
  },
  amountText: {
    textAlign: 'center',
    fontSize: 14,
    color: colors.DimGray,
    lineHeight: 14 * 1.4,
    letterSpacing: 12 * (-1 / 100),
    fontFamily: typography.SemiBold_600,
  },
});

export default History;
