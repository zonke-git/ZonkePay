import {getCustomerById_API} from '../../api/api';
import {
  customerDetails_submitOnBoardFormFailure,
  customerDetails_submitOnBoardFormLoader,
  customerDetails_submitOnBoardFormSuccess,
} from '../slice/commonDetailsSlice';

export const customerDetailsByID = token => async dispatch => {
  try {
    dispatch(customerDetails_submitOnBoardFormLoader());
    const response = await getCustomerById_API(token);
    console.log('common Details Form Response :', response);
    dispatch(customerDetails_submitOnBoardFormSuccess(response || 'Success'));
    return response;
  } catch (error) {
    console.log('common Details Form Error :', error);
    dispatch(
      customerDetails_submitOnBoardFormFailure(error || 'Submission failed'),
    );
    throw error;
  }
};
