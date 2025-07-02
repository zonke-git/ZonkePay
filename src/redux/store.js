import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import onBoardReducer from './slice/onBoardSlice';
import businessProfileReducer from './slice/businessProfileSlice';
import outletReducer from './slice/outletSlice';
import menuReducer from './slice/menuSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    onBoard: onBoardReducer,
    businessProfile: businessProfileReducer,
    outlet: outletReducer,
    menu: menuReducer,
  },
});
