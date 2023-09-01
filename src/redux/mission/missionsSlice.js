import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-extraneous-dependencies
// import axios from 'axios';

const baseApiUrl = 'https://api.spacexdata.com/v3/missions';

// First, create the thunk
const fetchMissions = createAsyncThunk(
  'missions/fetchMissions',
  async () => {
    try {
      // Retrieve state from localStorage
      const savedState = JSON.parse(localStorage.getItem('missions'));
      if (savedState === null) {
        const response = await fetch(baseApiUrl);
        const result = await response.json();

        const missions = [];
        result.forEach((x) => {
          x.reserved = false;
          missions.push(x);
        });
        return missions;
      }
      return savedState;
    } catch (error) {
      return [...error.message];
    }
  },
);

const initialState = {
  missions: [],
  error: '',
  loading: 'idle', // 'idle' | 'pending' | 'succeeded' | 'failed'
};

export const missionsSlice = createSlice({
  name: 'missions',
  initialState,
  reducers: {
    setMissions: (state, action) => {
      state.missions = [...action.payload];
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    joinMission: (state, action) => {
      const missionIndex = state.missions.findIndex(
        (m) => m.mission_id === action.payload.mission_id,
      );
      if (missionIndex !== -1) {
        const newMissions = [...state.missions]; // Create a copy of the missions array
        newMissions[missionIndex] = {
          ...newMissions[missionIndex],
          reserved: true,
        };
        state.missions = [...newMissions];
        // Save state to localStorage
        localStorage.setItem('missions', JSON.stringify(state.missions));
      }
    },
    leaveMission: (state, action) => {
      const missionIndex = state.missions.findIndex(
        (m) => m.mission_id === action.payload.mission_id,
      );
      if (missionIndex !== -1) {
        const newMissions = [...state.missions]; // Create a copy of the missions array
        newMissions[missionIndex] = {
          ...newMissions[missionIndex],
          reserved: false,
        };
        state.missions = [...newMissions];
        // Save state to localStorage
        localStorage.setItem('missions', JSON.stringify(state.missions));
      }
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchMissions.pending, (state) => {
      state.status = 'loading';
    }).addCase(fetchMissions.fulfilled, (state, action) => {
      state.status = 'succeeded';
      if (action.payload !== '') {
        state.missions = action.payload;
        if (state.missions.length === 0) state.error = 'No result was found!';
      } else {
        state.error = 'No result was found!';
      }
    }).addCase(fetchMissions.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  },
});

// Action creators are generated for each case reducer function
export const {
  joinMission,
  leaveMission,
  setError,
  setMissions,
} = missionsSlice.actions;
export { fetchMissions };

export default missionsSlice.reducer;
