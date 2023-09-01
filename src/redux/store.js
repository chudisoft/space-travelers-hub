import { configureStore } from '@reduxjs/toolkit';
import missionsReducer from './mission/missionsSlice';
import rocketReducer from './rockets/rocketSlice';

const store = configureStore({
  reducer: {
    missions: missionsReducer,
    rockets: rocketReducer,
  },
});

export default store;
