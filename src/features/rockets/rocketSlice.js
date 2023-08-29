import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = [];
const baseUrl = 'https://api.spacexdata.com/v4/rockets';

export const getRockets = createAsyncThunk('/rocket/getRockets', async () => {
  const rockets = await axios.get(baseUrl);
  return rockets.data.map((rocket) => ({ ...rocket, reserved: false }));
});

const rocketSlice = createSlice({
  name: 'rocket',
  initialState,
  reducers: {
    reserveRocket: (state, action) => {
      const rocketId = action.payload;
      const rocket = state.find((rocket) => rocket.id === rocketId);
      if (rocket) {
        rocket.reserved = true;
      }
    },
    cancelRocket: (state, action) => {
      const rocketId = action.payload;
      const rocket = state.find((rocket) => rocket.id === rocketId);
      if (rocket) {
        rocket.reserved = false;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getRockets.fulfilled, (state, action) => action.payload);
  },
});

export const rockets = (state) => state.rocket;

export const { reserveRocket, cancelRocket } = rocketSlice.actions;
export default rocketSlice.reducer;
