import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {customerDetailsByID} from '../../redux/action/commonDetailsActions';
import {customerDetails_submitFailure} from '../../redux/slice/commonDetailsSlice';

const useCustomerDetails = (token, onSuccess) => {
  const dispatch = useDispatch();

  const [merchant, setMerchant] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) return;

    setLoading(true);
    setError(null);

    dispatch(customerDetailsByID(token))
      .then(res => {
        console.log('res', res);

        const merchantData = res?.merchant;

        if (!merchantData) {
          const errorMsg = 'Submission failed';
          dispatch(customerDetails_submitFailure(errorMsg));
          setError(errorMsg);
          return;
        }

        setMerchant(merchantData);
        if (typeof onSuccess === 'function') {
          onSuccess(merchantData);
        }
      })
      .catch(() => {
        const errorMsg = 'Failed to fetch merchant details';
        dispatch(customerDetails_submitFailure(errorMsg));
        setError(errorMsg);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch, token, onSuccess]);

  return {merchant, loading, error};
};

export default useCustomerDetails;
