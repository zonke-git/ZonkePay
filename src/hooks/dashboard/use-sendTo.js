import {useNavigation} from '@react-navigation/native';
import {useEffect, useRef, useState} from 'react';

export const useSendTo = () => {
  const navigation = useNavigation();
  const [selectedUser, setSelectedUser] = useState([]);

  const handleBack = () => {
    navigation.goBack();
  };
  const handleSelectedUser = item => {
    console.log('Selected User Pressed', item);
    setSelectedUser(item);
  };

  return {
    handleBack,
    selectedUser,
    handleSelectedUser,
  };
};
