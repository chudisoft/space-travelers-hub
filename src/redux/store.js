import { configureStore } from '@reduxjs/toolkit';
import missionsReducer from './mission/missionsSlice';
import rocketReducer from '../features/rockets/rocketSlice';

const store = configureStore({
  reducer: {
    missions: missionsReducer,
    rocket: rocketReducer,
  },
  preloadedState: {
    rocket: [{ id: 1, reserved: true }],
  },
});

export default store;
