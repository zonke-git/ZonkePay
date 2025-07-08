import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setOnBoardDetails} from '../../redux/slice/onBoardSlice';

export const useOnboard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const onBoardFormValues = useSelector(
    state => state?.onBoard?.onBoardDetails,
  );
  const loginDetails = useSelector(state => state?.auth?.loginDetails);
  const commonDetails = useSelector(
    state =>
      state?.commonDetails?.customerDetails_SubmitSuccessMessage?.merchant,
  );
  console.log('commonDetails', commonDetails);
  const [openTermsAndConditionModal, setOpenTermsAndConditionModal] =
    useState(false);

  // useEffect(() => {
  //   if (commonDetails) {
  //     dispatch(
  //       setOnBoardDetails({
  //         firstName: commonDetails?.first_name,
  //         lastName: commonDetails?.last_name,
  //         nickname: '',
  //         email: commonDetails?.email,
  //         PhoneNumber: '',
  //         location: commonDetails?.location,
  //         location_name: commonDetails?.location,
  //         referralCode: '',
  //         termsAndConditions_PrivacyPolicyCheckBox: false,
  //         CIPCRegistrationNumber: '',
  //       }),
  //     );
  //   }
  // }, [commonDetails, dispatch]);

  const handleLocationNavigation = () => {
    navigation.navigate('Location');
  };

  const handleFormSubmit = values => {
    console.log('OnBoard Details Form submitted:', values);
    navigation.navigate('WalletCreatedSuccessfully');
    // submitOnboardingDetails
  };

  return {
    loginDetails,
    dispatch,
    onBoardFormValues,
    handleLocationNavigation,
    handleFormSubmit,
    openTermsAndConditionModal,
    setOpenTermsAndConditionModal,
  };
};
