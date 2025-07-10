import {
  businessDetailsAPI,
  customerVerification_API,
  updateCustomerdetail_API,
} from '../../api/api';
import {
  customerVerification_submitFailure,
  customerVerification_submitLoader,
  customerVerification_submitSuccess,
  updateOnBoardDetail_Failure,
  updateOnBoardDetail_Loader,
  updateOnBoardDetail_Success,
} from '../slice/onBoardSlice';

export const customerVerification = (payload, toke) => async dispatch => {
  try {
    dispatch(customerVerification_submitLoader());
    const response = await customerVerification_API(payload, toke);
    // console.log('Customer Verification Response :', response);
    dispatch(customerVerification_submitSuccess(response));
    return response;
  } catch (error) {
    console.log('Customer Verification Error :', error);
    dispatch(customerVerification_submitFailure(error.message || 'API Failed'));
    throw error;
  }
};

export const updateCustomerdetail =
  (payload, token, customerID) => async dispatch => {
    try {
      // 1. Dispatch loading action
      dispatch(updateOnBoardDetail_Loader());

      // 2. Make API call
      const response = await updateCustomerdetail_API(
        payload,
        token,
        customerID,
      );

      // 3. On success:
      // console.log('onBoard Details Form Response :', response);
      dispatch(updateOnBoardDetail_Success(response || 'Success'));
      return response;
    } catch (error) {
      // 4. On error:
      console.log('onBoard Details Form Error :', error);
      const rawError = error?.error || 'Submission failed';
      const cleanedError = rawError.replace(/\s*\n\s*/g, ' ').trim();

      dispatch(updateOnBoardDetail_Failure(cleanedError));
      throw error;
    }
  };
