import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import onBoardReducer from './slice/onBoardSlice';
import commonDetailsReducer from './slice/commonDetailsSlice';
// import outletReducer from './slice/outletSlice';
// import menuReducer from './slice/menuSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    onBoard: onBoardReducer,
    commonDetails: commonDetailsReducer,
    // outlet: outletReducer,
    // menu: menuReducer,
  },
});
