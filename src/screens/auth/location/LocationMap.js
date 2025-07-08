/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import AuthLayout from '../../layout/AuthLayout';
import colors from '../../../Theme/colors';
import {typography} from '../../../Theme/typography';
import AppButton from '../../../components/AppButton/AppButton';
import {i18n} from '../../../localization';
import {useMapLocation} from '../../../hooks';

const LocationMap = () => {
  const {
    mapRef,
    fetchingAddress,
    selectedLocationAddress,
    locationAddress,
    location,
    selectedLocation,
    loading,
    error,
    showGpsPrompt,
    showEnableGpsDialog,
    handleMapPress,
    handleSelect,
  } = useMapLocation();

  return (
    <AuthLayout
      title="Please Select Location"
      topStyle={{flex: 0.085}}
      fontStyle={{fontSize: 24}}>
      <View style={styles.container}>
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            {showGpsPrompt && (
              <TouchableOpacity onPress={showEnableGpsDialog}>
                <Text style={styles.enableGpsText}>Enable GPS</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        <MapView
          provider={PROVIDER_GOOGLE}
          ref={mapRef}
          style={[
            styles.map,
            {
              marginBottom:
                fetchingAddress || selectedLocationAddress || locationAddress
                  ? '37%'
                  : '22%',
            },
          ]}
          region={
            location || {
              latitude: -26.2041,
              longitude: 28.0473,
              latitudeDelta: 10.0, // Adjust delta to fit the full country
              longitudeDelta: 10.0,
            }
          }
          mapType={'standard'}
          zoomControlEnabled
          showsUserLocation={true}
          showsMyLocationButton={true}
          followsUserLocation={true}
          loadingEnabled={true}
          onPress={handleMapPress}>
          {location && (
            <Marker
              coordinate={location}
              title="You are here"
              pinColor={colors.gradientGreen}
            />
          )}
          {selectedLocation && (
            <Marker
              coordinate={selectedLocation}
              title="Selected Location"
              pinColor={colors.appTheme} // Custom color for selected marker
            />
          )}
        </MapView>
      </View>

      <View style={styles.bottomContainer}>
        {fetchingAddress ? (
          <View style={styles.addressLoadingContainer}>
            <ActivityIndicator size="small" color={colors.appTheme} />
            <Text style={styles.loadingText}>Fetching address...</Text>
          </View>
        ) : selectedLocationAddress ? (
          <View style={styles.addressView}>
            <Image
              source={require('../../../assets/images/location.png')}
              style={styles.locationIcon}
            />
            <View style={styles.cityAddressView}>
              <Text style={styles.cityText}>
                {selectedLocationAddress?.city || 'Unknown location'}
              </Text>
              <Text style={styles.lineAddressText}>
                {selectedLocationAddress?.address || ''},
              </Text>
            </View>
          </View>
        ) : locationAddress ? (
          <View style={styles.addressView}>
            <Image
              source={require('../../../assets/images/location.png')}
              style={[styles.locationIcon]}
            />
            <View style={styles.cityAddressView}>
              <Text style={styles.cityText}>
                Current Location: {locationAddress?.city}
              </Text>
              <Text style={styles.lineAddressText}>
                {locationAddress?.city},{locationAddress?.address},
              </Text>
            </View>
          </View>
        ) : null}
        {loading && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color={colors.appTheme} />
            <Text style={[styles.cityText, {color: colors.black}]}>
              Get Current Location
            </Text>
          </View>
        )}

        <AppButton
          title={i18n.t('SelectLocation')}
          onPress={handleSelect}
          // disabled={!isValid}
          useColors={[colors.appTheme, colors.appTheme]}
          // textStyle={{
          //   color: !isValid ? colors.LightSlateGray : colors.white,
          // }}
        />
      </View>
    </AuthLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'red',
  },
  map: {
    flex: 1,

    ...StyleSheet.absoluteFillObject,
  },
  errorContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    zIndex: 1,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    textAlign: 'center',
  },
  enableGpsText: {
    color: 'blue',
    textAlign: 'center',
    marginTop: 8,
  },
  bottomContainer: {
    padding: 24,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    elevation: 10, // for Android shadow
    shadowColor: '#000', // for iOS shadow
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },

  buttonWrapper: {
    width: '100%',
    borderRadius: 10,
    shadowColor: colors.DenimBlue,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.48,
    shadowRadius: 4,
    elevation: 4,
  },
  button: {
    borderRadius: 10,
    paddingVertical: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 14,
    color: colors.white,
    lineHeight: 14 * 1.4,
    letterSpacing: 14 * (-1 / 100),
    fontFamily: typography.Medium_500,
  },
  addressView: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
    marginBottom: 16,
  },
  locationIcon: {
    width: 22,
    height: 28,
    tintColor: colors.SimplyCharcoal,
    marginRight: 13,
  },
  cityAddressView: {
    flexDirection: 'column',
  },
  cityText: {
    fontSize: 16,
    color: colors.SimplyCharcoal,
    lineHeight: 16 * 1.4,
    letterSpacing: 14 * (0 / 100),
    fontFamily: typography.SemiBold_600,
  },
  lineAddressText: {
    fontSize: 14,
    color: colors.SimplyCharcoalDarkGray,
    lineHeight: 14 * 1.4,
    letterSpacing: 14 * (0 / 100),
    fontFamily: typography.Regular_400,
    marginTop: 4,
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
});

export default LocationMap;
