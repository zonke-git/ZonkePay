import React, {useCallback} from 'react';
import {Text, StyleSheet, View, Image} from 'react-native';
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {useBottomSheet} from '../../../hooks/bottomSheet/use-BottomSheet';
import colors from '../../../theme/colors';
import {typography} from '../../../theme/typography';

const BottomTabSheet = () => {
  const {
    bottomSheetRef,
    snapPoints,
    handleSheetChanges,
    data,
    // Removed closeSheet to prevent closure
  } = useBottomSheet();

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
    <BottomSheet
      ref={bottomSheetRef}
      index={-1} // index 2 = 100% screen height now
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      enablePanDownToClose={false}
      backgroundStyle={styles.bottomSheetBackground}
      handleIndicatorStyle={styles.bottomSheetHandleIndicator}>
      <BottomSheetView style={{flex: 1}}>
        <View style={{flex: 1, paddingHorizontal: 30, paddingBottom: 40}}>
          <Text style={styles.contentTitle}>RECENT TRANSACTIONS</Text>
          <BottomSheetFlatList
            data={data}
            scrollEnabled={true}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            contentContainerStyle={{paddingBottom: 60}}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          />
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 30,
    // alignItems: 'center',
  },
  contentTitle: {
    fontSize: 14,
    color: colors.black,
    lineHeight: 14 * 1.4,
    letterSpacing: 12 * (-1 / 100),
    fontFamily: typography.Bold_700,
    marginBottom: 20,
  },
  listView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
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
  bottomSheetBackground: {
    backgroundColor: '#EEF7FB',
    borderRadius: 30,
  },
  bottomSheetHandleIndicator: {
    backgroundColor: '#999',
  },
});

export default BottomTabSheet;
