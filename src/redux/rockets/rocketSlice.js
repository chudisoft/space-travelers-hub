import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  rockets: [],
};
const baseUrl = 'https://api.spacexdata.com/v4/rockets';

export const getRockets = createAsyncThunk('/rocket/getRockets', async () => {
  // Retrieve state from localStorage
  const savedState = JSON.parse(localStorage.getItem('rockets'));
  if (savedState === null) {
    const response = await fetch(baseUrl);
    const rocketsData = await response.json();
    const rocketsWithReserved = rocketsData.map((rocket) => ({
      ...rocket,
      reserved: false,
    }));
    return rocketsWithReserved;
  }
  return savedState;
});

const rocketSlice = createSlice({
  name: 'rocket',
  initialState,
  reducers: {
    setRockets: (state, action) => {
      state.rockets = action.payload;
    },
    reserveRocket: (state, action) => {
      const rocketId = action.payload;
      const rocket = state.rockets.find((rocket) => rocket.id === rocketId);
      if (rocket) {
        rocket.reserved = true;
        // Save state to localStorage
        localStorage.setItem('rockets', JSON.stringify(state.rockets));
      }
    },
    cancelRocket: (state, action) => {
      const rocketId = action.payload;
      const rocket = state.rockets.find((rocket) => rocket.id === rocketId);
      if (rocket) {
        rocket.reserved = false;
        // Save state to localStorage
        localStorage.setItem('rockets', JSON.stringify(state.rockets));
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getRockets.fulfilled, (state, action) => {
      state.rockets = action.payload;
    });
  },
});

export const rockets = (state) => state.rocket;

export const { reserveRocket, cancelRocket, setRockets } = rocketSlice.actions;
export default rocketSlice.reducer;
