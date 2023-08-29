import { configureStore } from '@reduxjs/toolkit';
import rockerReducer from '../features/rockets/rocketSlice';

const store = configureStore({
  reducer: {
    rocket: rockerReducer,
  },
});

export default store;
