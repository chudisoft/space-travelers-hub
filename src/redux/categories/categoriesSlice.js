import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: [
    'Action',
    'Science Fiction',
    'Economy',
    'Music',
  ],
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategory: (state, action) => {
      state.categories.push(action.payload);
    },
    removeCategory: (state, action) => {
      state.categories.pop(initialState.categories.find((x) => x === action.payload));
    },
    checkStatus: (state) => {
      state.categories = state.categories.length === 0 ? ['Under construction']
        : state.categories;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addCategory, removeCategory, checkStatus } = categoriesSlice.actions;

export default categoriesSlice.reducer;
