import {getBusinessCategories} from '../../api/api';
import {
  setCategoriesLoader,
  setCategoriesSuccess,
  setCategoriesFailure,
  submitOnBoardFormLoader,
  submitOnBoardFormSuccess,
  submitOnBoardFormFailure,
} from '../slice/onBoardSlice';
import axios from 'axios';

export const fetchCategories = () => async dispatch => {
  try {
    dispatch(setCategoriesLoader());
    const response = await getBusinessCategories();
    // console.log('Business Categories Response :', response);
    dispatch(setCategoriesSuccess(response));
  } catch (error) {
    dispatch(
      setCategoriesFailure(error.message || 'Failed to fetch categories'),
    );
  }
};

export const submitOnBoardForm = formData => async dispatch => {
  try {
    dispatch(submitOnBoardFormLoader());
    const response = await axios.post('https://your-api.com/submit', formData);
    dispatch(submitOnBoardFormSuccess(response.data.message || 'Success'));
  } catch (error) {
    dispatch(
      submitOnBoardFormFailure(
        error.response?.data?.message || 'Submission failed',
      ),
    );
  }
};
