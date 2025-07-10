import {customerDetailsByID} from '../redux/action/commonDetailsActions';
import {
  authToken,
  setMerchant_details,
  setMerchant_id,
} from '../redux/slice/authSlice';
import {getMPIN, saveAuthToken, setMerchant_id_} from './authStorage';

export const saveSessionAndNavigate = async (
  response,
  dispatch,
  navigation,
  Direct = false,
) => {
  // console.log('response', response);

  const token = response?.token;
  // const merchant = response?.merchant;
  // const merchantId = merchant?._id;
  if (token) {
    dispatch(authToken(token));
    await saveAuthToken(token);
    dispatch(customerDetailsByID(token));
  }
  // if (merchant) {
  //   dispatch(setMerchant_details(merchant));
  //   dispatch(setMerchant_id(merchantId));
  //   await setMerchant_id_(merchantId);
  // }
  if (Direct) {
    navigation.navigate('MainApp');
  } else if (response?.newUser) {
    navigation.navigate('Onboard');
  } else if (response?.existingmerchant) {
    // const get_mpin = await getMPIN();
    // if (get_mpin) {
    navigation.navigate('MainApp');
    // navigation.navigate('Onboard');
    // } else {
    // navigation.navigate('Mpin');
    // }
  } else {
    navigation.navigate('UserType');
    // navigation.navigate('Onboard');
  }
};
