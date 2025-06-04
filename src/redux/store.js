import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import onBoardReducer from './slice/onBoardSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    onBoard: onBoardReducer,
  },
});
