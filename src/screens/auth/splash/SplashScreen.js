import React, {useEffect, useState} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import Video from 'react-native-video';
import {useNavigation} from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import {requestUserPermission} from '../../../utils/notificationPermission';

const SplashScreen = () => {
  const navigation = useNavigation();
  const [playVideo, setPlayVideo] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        StatusBar.setHidden(true, 'none');

        const token = await requestUserPermission();
        if (token) {
          console.log('FCM token:', token);
        }

        messaging().onMessage(remoteMessage => {
          console.log('Foreground notification:', remoteMessage);
        });

        const opened = await messaging().getInitialNotification();
        if (opened) {
          console.log('App opened from quit state via notification:', opened);
        }

        // Allow video to play only after permission
        setPlayVideo(true);
      } catch (error) {
        console.error('Error during splash permission setup:', error);
        setPlayVideo(true); // Still play video even on failure
      }
    };

    init();

    return () => {
      StatusBar.setHidden(false, 'slide');
    };
  }, []);

  const handleVideoEnd = () => {
    navigation.replace('Welcome');
  };

  return (
    <View style={styles.container}>
      {playVideo && (
        <Video
          source={require('./APP_LOGO.mp4')}
          style={styles.backgroundVideo}
          resizeMode="cover"
          muted={true}
          repeat={false}
          paused={false}
          rate={1.0}
          playInBackground={false}
          playWhenInactive={false}
          onEnd={handleVideoEnd}
          maxBitRate={2500000}
          bufferConfig={{
            minBufferMs: 15000,
            maxBufferMs: 30000,
            bufferForPlaybackMs: 2500,
            bufferForPlaybackAfterRebufferMs: 5000,
          }}
          onError={error => console.log('Video Error:', error)}
        />
      )}
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
    width: '100%',
    height: '100%',
  },
});

export default SplashScreen;
