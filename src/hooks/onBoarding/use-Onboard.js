import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-root-toast';
import {updateCustomerdetail} from '../../redux/action/onBoardActions';

export const useOnboard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [openTermsAndConditionModal, setOpenTermsAndConditionModal] =
    useState(false);
  const onBoardFormValues = useSelector(
    state => state?.onBoard?.updateOnBoardDetail,
  );
  const token = useSelector(state => state?.auth?.authTokenInfo);
  const loginDetails = useSelector(state => state?.auth?.loginDetails);
  const commonDetails = useSelector(
    state =>
      state?.commonDetails?.customerDetails_SubmitSuccessMessage?.merchant,
  );
  const IsLoading = useSelector(
    state => state?.onBoard?.updateOnBoardDetail_IsSubmitting,
  );
  const customer_ID = useSelector(
    state =>
      state?.onBoard?.customerVerification_SubmitSuccessMessage?.user?._id,
  );
  // console.log('customer_ID', customer_ID);

  const handleLocationNavigation = () => {
    navigation.navigate('Location');
  };

  const handleFormSubmit = values => {
    console.log('OnBoard Details Form submitted:', values);

    let payload = {
      email: values?.email,
      location: values?.location_name,
      referalcode: values?.referralCode,
    };
    dispatch(updateCustomerdetail(payload, token, customer_ID))
      .then(async response => {
        console.log('Update Customer Verification Response :', response);
        if (response?.merchant) {
          navigation.navigate('WalletCreatedSuccessfully');
        } else {
          Toast.show(response?.message || 'Something went wrong', {
            duration: Toast.durations.SHORT,
            position: Toast.positions.BOTTOM,
          });
        }
      })
      .catch(error => {
        console.error('Update Customer Verification Error :', error);
        Toast.show(error?.error || 'Something went wrong', {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
        });
      });
  };

  return {
    loginDetails,
    IsLoading,
    onBoardFormValues,
    openTermsAndConditionModal,

    dispatch,
    handleLocationNavigation,
    handleFormSubmit,
    setOpenTermsAndConditionModal,
  };
};
