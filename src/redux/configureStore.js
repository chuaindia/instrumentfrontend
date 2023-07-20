import { configureStore, combineReducers } from '@reduxjs/toolkit';
import laptopsReducer from './laptops/laptops';
import userReducer from './user/session-redux';

const rootReducer = combineReducers({
  laptops: laptopsReducer,
  users: userReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
