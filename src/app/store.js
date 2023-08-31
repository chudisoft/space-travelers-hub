import { configureStore } from '@reduxjs/toolkit';
import rocketReducer from '../features/rockets/rocketSlice';

const store = configureStore({
  reducer: { rocket: rocketReducer },
  preloadedState: {
    rocket: [{ id: 1, reserved: true }],
  },
});

export default store;
