import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

export const useOnboard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const onBoardFormValues = useSelector(state => state?.onBoard?.onBoardValues);
  const loginDetails = useSelector(state => state?.auth?.loginDetails);

  const handleLocationNavigation = () => {
    navigation.navigate('Location');
  };

  const handleFormSubmit = values => {
    console.log('OnBoard Details Form submitted:', values);
    navigation.navigate('WalletCreatedSuccessfully');
  };

  console.log('onBoardFormValues', onBoardFormValues);

  return {
    loginDetails,
    dispatch,
    onBoardFormValues,
    handleLocationNavigation,
    handleFormSubmit,
  };
};
