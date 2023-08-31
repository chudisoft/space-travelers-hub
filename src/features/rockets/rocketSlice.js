import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = [];
const baseUrl = 'https://api.spacexdata.com/v4/rockets';

export const getRockets = createAsyncThunk('/rocket/getRockets', async () => {
  const response = await fetch(baseUrl);
  const rocketsData = await response.json();
  const rocketsWithReserved = rocketsData.map((rocket) => ({
    ...rocket,
    reserved: false,
  }));
  return rocketsWithReserved;
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
