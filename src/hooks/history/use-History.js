import {useNavigation} from '@react-navigation/native';
import {useRef, useState} from 'react';
import {useDispatch} from 'react-redux';

export const useHistory = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [historyData, setHistoryData] = useState([
    {id: '1', date: '', title: 'Payment to John - ₹500'},
    {id: '2', date: '', title: 'Received from Alice - ₹750'},
    {id: '3', date: '', title: 'Recharge - ₹199'},
    {id: '4', date: '', title: 'Electricity Bill - ₹1200'},
    {id: '5', date: '', title: 'Payment to John - ₹500'},
    {id: '6', date: '', title: 'Received from Alice - ₹750'},
    {id: '7', date: '', title: 'Recharge - ₹199'},
    {id: '8', date: '', title: 'Electricity Bill - ₹1200'},
    {id: '9', date: '', title: 'Payment to John - ₹500'},
    {id: '10', date: '', title: 'Received from Alice - ₹750'},
    {id: '11', date: '', title: 'Recharge - ₹199'},
    {id: '12', date: '', title: 'Electricity Bill - ₹1200'},
    {id: '13', date: '', title: 'Payment to John - ₹500'},
    {id: '14', date: '', title: 'Received from Alice - ₹750'},
    {id: '15', date: '', title: 'Recharge - ₹199'},
    {id: '16', date: '', title: 'Electricity Bill - ₹1200'},
  ]);

  const handleBack = () => {
    navigation.goBack();
  };

  return {
    historyData,
    handleBack,
  };
};
