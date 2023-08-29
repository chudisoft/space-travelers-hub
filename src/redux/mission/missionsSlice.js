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

const addMission = createAsyncThunk(
  'missions/addMission',
  async (mission) => {
    const response = await axios.post(`${baseApiUrl}missions`, mission);
    return response.data === 'Created' ? mission : null;
  },
);

const removeMission = createAsyncThunk(
  'missions/removeMission',
  async (mission) => {
    const response = await axios.delete(`${baseApiUrl}missions/${mission.item_id}`);
    return response.data === 'The mission was deleted successfully!' ? mission : null;
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
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchMissions.pending, (state) => {
      state.status = 'loading';
    }).addCase(fetchMissions.fulfilled, (state, action) => {
      state.status = 'succeeded';
      if (action.payload !== '') {
        const missions = action.payload;
        // action.payload.forEach((x) => {
        //   missions.push({ item_id: x, ...action.payload[x][0] });
        // });
        state.missions = missions;
        if (state.missions.length === 0) state.error = 'No result was found!';
      } else {
        state.error = 'No result was found!';
      }
    }).addCase(fetchMissions.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
    builder.addCase(addMission.pending, (state) => {
      state.status = 'loading';
    }).addCase(addMission.fulfilled, (state, action) => {
      if (action.payload !== null) {
        state.status = 'succeeded';
        state.error = '';
        state.missions.push(action.payload);
      } else {
        state.status = 'failed';
        state.error = 'Unable to add record!';
      }
    }).addCase(addMission.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
    builder.addCase(removeMission.pending, (state) => {
      state.status = 'loading';
    }).addCase(removeMission.fulfilled, (state, action) => {
      if (action.payload !== null) {
        state.status = 'succeeded';
        state.error = '';
        state.missions = state.missions.filter((x) => x.item_id !== action.payload.item_id);
        if (state.missions.length === 0) state.error = 'No result was found!';
      } else {
        state.status = 'failed';
        state.error = 'Unable to remove record!';
      }
    }).addCase(removeMission.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  },
});

// Action creators are generated for each case reducer function
export { addMission, fetchMissions, removeMission };

export default missionsSlice.reducer;
