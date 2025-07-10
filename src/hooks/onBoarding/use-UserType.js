import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {customerVerification} from '../../redux/action/onBoardActions';
import Toast from 'react-native-root-toast';
import {setupdateOnBoardDetail} from '../../redux/slice/onBoardSlice';

export const useUserType = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const customerDetails = useSelector(state => state?.onBoard?.customerDetails);
  const token = useSelector(state => state?.auth?.authTokenInfo);
  const IsLoading = useSelector(
    state => state?.onBoard?.customerVerification_IsSubmitting,
  );

  const userTypeOptions = [
    {id: 1, name: 'CUSTOMER'},
    {id: 2, name: 'MERCHANT'},
  ];

  const handleFormSubmit = values => {
    // console.log('Details submitted:', values);
    let payload = {
      type: 'MERCHANT',
      saId: '0101310000080',
    };
    dispatch(customerVerification(payload, token))
      .then(async response => {
        console.log('Customer Verification Response :', response?.user);
        if (response?.success) {
          dispatch(
            setupdateOnBoardDetail({
              firstName: response?.user?.first_name,
              lastName: response?.user?.last_name,
              nickname: '',
              email: response?.user?.email,
              PhoneNumber: response?.user?.contact_number,
              location: response?.user?.location,
              location_name: response?.user?.location,
              referralCode: '',
              termsAndConditions_PrivacyPolicyCheckBox: false,
            }),
          );
          navigation.navigate('Onboard');
        } else {
          Toast.show(response?.message || 'Something went wrong', {
            duration: Toast.durations.SHORT,
            position: Toast.positions.BOTTOM,
          });
        }
      })
      .catch(error => {
        console.error('Customer Verification Error :', error);
        Toast.show(error?.error || 'Something went wrong', {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
        });
      });
  };

  return {
    customerDetails,
    userTypeOptions,
    IsLoading,

    dispatch,
    handleFormSubmit,
  };
};
