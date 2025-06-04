import {useNavigation} from '@react-navigation/native';
import {useRef, useState} from 'react';

export const useWelcome = () => {
  const navigation = useNavigation();
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [welcomeMessage, setWelcomeMessage] = useState(true);

  const handleWelcomeScreen = () => {
    setWelcomeMessage(false);
  };

  const handleIndexChange = index => {
    setActiveIndex(index);
    carouselRef.current?.scrollTo({index});
  };

  const handleNavigation = () => {
    navigation.navigate('SignUp');
  };

  return {
    activeIndex,
    carouselRef,
    setActiveIndex,
    welcomeMessage,
    setWelcomeMessage,
    handleWelcomeScreen,
    handleIndexChange,
    handleNavigation,
  };
};
