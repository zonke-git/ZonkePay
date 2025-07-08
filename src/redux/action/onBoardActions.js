import {businessDetailsAPI} from '../../api/api';
import {
  onBoardDetails_Failure,
  onBoardDetails_Loader,
  onBoardDetails_Success,
} from '../slice/onBoardSlice';

export const submitOnboardingDetails = (payload, token) => async dispatch => {
  try {
    // 1. Dispatch loading action
    dispatch(onBoardDetails_Loader());

    // 2. Make API call
    const response = await businessDetailsAPI(payload, token);

    // 3. On success:
    // console.log('onBoard Details Form Response :', response);
    dispatch(onBoardDetails_Success(response || 'Success'));
    return response;
  } catch (error) {
    // 4. On error:
    console.log('onBoard Details Form Error :', error);
    const rawError = error?.error || 'Submission failed';
    const cleanedError = rawError.replace(/\s*\n\s*/g, ' ').trim();

    dispatch(onBoardDetails_Failure(cleanedError));
    throw error;
  }
};
