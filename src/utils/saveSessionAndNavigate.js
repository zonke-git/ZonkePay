// import {getMerchantDetails} from '../redux/action/businessProfileActions';
// import {
//   authToken,
//   setMerchant_details,
//   setMerchant_id,
// } from '../redux/slice/authSlice';
// import {
//   businessDetails_submitOnBoard_reset,
//   setOnBoardFormNumber,
// } from '../redux/slice/onBoardSlice';
// import {getMPIN, saveAuthToken, setMerchant_id_} from './authStorage';

export const saveSessionAndNavigate = async (
  response,
  dispatch,
  navigation,
) => {
  //   const token = response?.token;
  //   const merchant = response?.merchant;
  //   const merchantId = merchant?._id;
  //   if (token) {
  //     dispatch(authToken(token));
  //     await saveAuthToken(token);
  //   }
  //   if (merchant) {
  //     dispatch(setMerchant_details(merchant));
  //     dispatch(setMerchant_id(merchantId));
  //     await setMerchant_id_(merchantId);
  //   }
  //   if (response?.newUser) {
  //     dispatch(businessDetails_submitOnBoard_reset());
  //     dispatch(setOnBoardFormNumber(1));
  //     navigation.navigate('Onboard');
  //   } else if (token) {
  //     dispatch(getMerchantDetails(token));
  //     if (!merchant?.step1_completed) {
  //       dispatch(setOnBoardFormNumber(1));
  //       navigation.navigate('Onboard');
  //     } else if (!merchant?.step2_completed) {
  //       dispatch(setOnBoardFormNumber(2));
  //       const get_mpin = await getMPIN();
  //       if (get_mpin) {
  //         navigation.navigate('Onboard');
  //       } else {
  //         navigation.navigate('Mpin');
  //       }
  //     } else if (!merchant?.step3_completed) {
  //       dispatch(setOnBoardFormNumber(3));
  //       navigation.navigate('Onboard');
  //     } else if (!merchant?.step4_completed) {
  //       dispatch(setOnBoardFormNumber(4));
  //       navigation.navigate('Onboard');
  //     } else {
  //       // dispatch(setOnBoardFormNumber(3));
  //       // navigation.navigate('Onboard');
  //       navigation.navigate('MainApp');
  //     }
  //   }
};
