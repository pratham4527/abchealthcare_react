import { combineReducers } from 'redux';
import userReducer from './userReducer';
import cartReducer from './cartReducer';

const rootReducer = combineReducers({
  userData: userReducer,
  cart: cartReducer,
  // Add other reducers if needed
});

export default rootReducer;
