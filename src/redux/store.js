import { configureStore } from '@reduxjs/toolkit';
import missionsReducer from './mission/missionsSlice';

const store = configureStore(
  {
    reducer: {
      missions: missionsReducer,
    },
  },
);

export default store;
