import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import colors from '../../../Theme/colors';
import {typography} from '../../../Theme/typography';
import {useSendTo} from '../../../hooks/dashboard/use-sendTo';
import SendToContacts from './SendToContacts';
import DashLayout from '../../layout/DashLayout';

const SendTo = () => {
  const {handleBack, selectedUser, handleSelectedUser} = useSendTo();

  return (
    <DashLayout
      title="Send Money"
      loader={false}
      backButton={true}
      handleBack={handleBack}>
      <View style={styles.Container}>
        <SendToContacts
          layoutType="horizontal"
          showAddNew={true}
          onAddNewPress={() => {
            console.log('Add New Pressed');
          }}
          handleSelectedUser={handleSelectedUser}
        />
        {/* <View style={styles.dispalyMainContent}> */}
        <Text style={styles.titleText}>{selectedUser?.name}</Text>
        <Text style={styles.titleText}>{selectedUser?.name}</Text>
        <Text style={styles.titleText}>{selectedUser?.name}</Text>
        <Text style={styles.titleText}>{selectedUser?.name}</Text>
        <Text style={styles.titleText}>{selectedUser?.name}</Text>
        <Text style={styles.titleText}>{selectedUser?.name}</Text>
        {/* </View> */}
      </View>
    </DashLayout>
  );
};
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    padding: 16,
  },
  nameText: {
    fontSize: 14,
    color: colors.black,
    lineHeight: 14 * 1.4,
    letterSpacing: 12 * (-1 / 100),
    fontFamily: typography.Medium_500,
    marginTop: 20,
  },

  dispalyMainContent: {
    // flex: 1,
    // justifyContent: 'center',
    // alignContent: 'center',
    // alignItems: 'center',
    // alignSelf: 'center',
  },
});

export default SendTo;
