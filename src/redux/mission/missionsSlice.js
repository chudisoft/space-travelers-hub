import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';

const baseApiUrl = 'https://api.spacexdata.com/v3/missions';

// First, create the thunk
const fetchMissions = createAsyncThunk(
  'missions/fetchMissions',
  async () => {
    const response = await axios.get(`${baseApiUrl}`);
    return response.data;
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
        const missions = [];
        action.payload.forEach((x) => {
          x.reserved = false;
          missions.push(x);
        });
        state.missions = missions;
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
export const { joinMission, leaveMission } = missionsSlice.actions;
export { fetchMissions };

export default missionsSlice.reducer;
