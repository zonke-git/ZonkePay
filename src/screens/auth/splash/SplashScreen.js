import React, {useEffect} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import Video from 'react-native-video';
import {useNavigation} from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();

  // Effect to hide the status bar when the component mounts
  useEffect(() => {
    StatusBar.setHidden(true, 'none'); // Hide status bar for true full-screen

    // Optional: Show status bar again when component unmounts
    // This might not be strictly necessary if the next screen manages its own status bar,
    // especially with navigation.replace().
    // return () => {
    //   StatusBar.setHidden(false, 'slide');
    // };
  }, []);

  const handleVideoEnd = () => {
    navigation.replace('Welcome');
  };

  return (
    <View style={styles.container}>
      <Video
        source={require('./APP_LOGO.mp4')} // Ensure this path is correct
        style={styles.backgroundVideo}
        resizeMode="cover" // Or "cover" if you want to fill the screen, potentially cropping
        muted={true}
        repeat={false}
        rate={1.0}
        playWhenInactive={false}
        playInBackground={false}
        onEnd={handleVideoEnd} // Added the onEnd handler
        maxBitRate={2500000} // 2.5 Mbps limit
        bufferConfig={{
          minBufferMs: 15000,
          maxBufferMs: 30000,
          bufferForPlaybackMs: 2500,
          bufferForPlaybackAfterRebufferMs: 5000,
        }}
        onError={error => console.log('Video Error:', error)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default SplashScreen;
