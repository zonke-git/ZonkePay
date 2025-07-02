import React, {useCallback} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Pressable,
  ActivityIndicator,
  Platform,
  RefreshControl,
  PermissionsAndroid,
  Linking,
} from 'react-native';
import DashboardLayout from '../../layout/DashboardLayout';
import {useNewPayment} from '../../../hooks/newPayment/use-NewPayment';
import colors from '../../../Theme/colors';
import {typography} from '../../../Theme/typography';
import {i18n} from '../../../localization';
import IconGrid from '../bank/IconGrid';

const NewPayment = () => {
  const {
    contactsData,
    handleBack,
    permissionStatus,
    isLoadingContacts,
    error,
    refreshContacts,
  } = useNewPayment();

  const renderItem = useCallback(({item}) => {
    const contactName =
      item.displayName || item.givenName || item.familyName || 'No Name';
    const phoneNumber =
      item.phoneNumbers?.length > 0 ? item.phoneNumbers[0].number : 'No Phone';

    return (
      <Pressable style={styles.listView}>
        <View style={styles.rowView}>
          <Image
            source={require('../../../assets/images/account.png')}
            style={styles.profilePic}
          />
          <View style={styles.nameContent}>
            <Text style={styles.contentNameText}>{contactName}</Text>
            <Text style={styles.contentText}>{phoneNumber}</Text>
          </View>
        </View>
      </Pressable>
    );
  }, []);

  const renderContent = () => {
    // Loading state
    if (isLoadingContacts || permissionStatus === 'checking') {
      return (
        <View style={styles.centerMessage}>
          <ActivityIndicator size="large" color={colors.appTheme} />
          <Text style={styles.messageText}>
            {permissionStatus === 'checking'
              ? 'Checking permissions...'
              : 'Loading contacts...'}
          </Text>
        </View>
      );
    }

    // Error states
    if (error) {
      return (
        <View style={styles.centerMessage}>
          <Text style={styles.errorText}>{error}</Text>
          <Pressable style={styles.retryButton} onPress={refreshContacts}>
            <Text style={styles.retryButtonText}>Try Again</Text>
          </Pressable>
        </View>
      );
    }

    // Permission denied states
    if (
      permissionStatus === PermissionsAndroid.RESULTS.DENIED ||
      (Platform.OS === 'ios' && permissionStatus === 'denied')
    ) {
      return (
        <View style={styles.centerMessage}>
          <Text style={styles.messageText}>Contacts permission denied</Text>
          <Text style={styles.subMessageText}>
            Please grant permission in settings to continue
          </Text>
          <Pressable
            style={styles.settingsButton}
            onPress={() => Linking.openSettings()}>
            <Text style={styles.settingsButtonText}>Open Settings</Text>
          </Pressable>
        </View>
      );
    }

    // Never ask again state
    if (
      permissionStatus === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN ||
      (Platform.OS === 'ios' && permissionStatus === 'restricted')
    ) {
      return (
        <View style={styles.centerMessage}>
          <Text style={styles.messageText}>Permission permanently denied</Text>
          <Text style={styles.subMessageText}>
            You need to enable contacts permission manually in app settings
          </Text>
          <Pressable
            style={styles.settingsButton}
            onPress={() => Linking.openSettings()}>
            <Text style={styles.settingsButtonText}>Open Settings</Text>
          </Pressable>
        </View>
      );
    }

    // Permission granted but no contacts
    if (contactsData.length === 0) {
      return (
        <View style={styles.centerMessage}>
          <Text style={styles.messageText}>No contacts found</Text>
          <Text style={styles.subMessageText}>
            Please check if you have contacts on your device
          </Text>
          <Pressable style={styles.retryButton} onPress={refreshContacts}>
            <Text style={styles.retryButtonText}>Refresh</Text>
          </Pressable>
        </View>
      );
    }

    // Success state - show contacts
    return (
      <FlatList
        data={contactsData}
        keyExtractor={item => item.recordID.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl
            refreshing={isLoadingContacts}
            onRefresh={refreshContacts}
            colors={[colors.appTheme]}
          />
        }
      />
    );
  };

  return (
    <DashboardLayout
      title="New Payment"
      loader={false}
      backButton={true}
      handleBack={handleBack}>
      <View style={styles.Container}>
        <IconGrid layoutType="horizontal" />
        <Text style={styles.titleText}>{i18n.t('MyContact')}</Text>
        {renderContent()}
      </View>
    </DashboardLayout>
  );
};
const styles = StyleSheet.create({
  Container: {flex: 1, padding: 16},
  titleText: {
    fontSize: 14,
    color: colors.black,
    lineHeight: 14 * 1.4,
    letterSpacing: 12 * (-1 / 100),
    fontFamily: typography.Medium_500,
    marginTop: 20,
  },
  listContainer: {},
  listView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.lightGray,
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  nameContent: {},
  contentNameText: {
    fontSize: 16,
    color: colors.black,
    fontFamily: typography.Medium_500,
  },
  contentText: {
    fontSize: 14,
    color: colors.DimGray,
    fontFamily: typography.Regular_400,
  },
  centerMessage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  messageText: {
    fontSize: 16,
    color: colors.DimGray,
    fontFamily: typography.SemiBold_600,
    textAlign: 'center',
    marginTop: 10,
  },
  subMessageText: {
    fontSize: 14,
    color: colors.DimGray,
    fontFamily: typography.Regular_400,
    textAlign: 'center',
    marginTop: 5,
  },
});

export default NewPayment;
