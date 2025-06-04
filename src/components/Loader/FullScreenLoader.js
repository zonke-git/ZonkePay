import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Url} from '../../api/url';

const FullScreenLoader = () => {
  return (
    <View style={styles.container}>
      {/* <FastImage
        source={{uri: `${Url.IMAGE_BASE_URL}LoaderLogo.gif`}}
        style={styles?.gifLoader}
      /> */}
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    position: 'absolute',
    zIndex: 1,
    // marginTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight,
  },
  gifLoader: {
    width: 30,
    height: 40,
    alignSelf: 'center',
  },
  loaderContainer: {
    alignItems: 'center',
  },
});
export default FullScreenLoader;
