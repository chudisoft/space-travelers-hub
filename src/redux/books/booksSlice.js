import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';

const baseApiUrl = 'https://us-central1-space-travelers-hub-api-e63c8.cloudfunctions.net/space-travelers-hubApi/apps/s4Jy4vQC08zpfLQKgC81/';

// First, create the thunk
const fetchBooks = createAsyncThunk(
  'books/fetchBooks',
  async () => {
    const response = await axios.get(`${baseApiUrl}books`);
    return response.data;
  },
);

const addBook = createAsyncThunk(
  'books/addBook',
  async (book) => {
    const response = await axios.post(`${baseApiUrl}books`, book);
    return response.data === 'Created' ? book : null;
  },
);

const removeBook = createAsyncThunk(
  'books/removeBook',
  async (book) => {
    const response = await axios.delete(`${baseApiUrl}books/${book.item_id}`);
    return response.data === 'The book was deleted successfully!' ? book : null;
  },
);

const initialState = {
  books: [],
  error: '',
  loading: 'idle', // 'idle' | 'pending' | 'succeeded' | 'failed'
};

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchBooks.pending, (state) => {
      state.status = 'loading';
    }).addCase(fetchBooks.fulfilled, (state, action) => {
      state.status = 'succeeded';
      if (action.payload !== '') {
        const books = [];
        const keys = Object.keys(action.payload);
        keys.forEach((x) => {
          books.push({ item_id: x, ...action.payload[x][0] });
        });
        state.books = books;
        if (state.books.length === 0) state.error = 'No result was found!';
      } else {
        state.error = 'No result was found!';
      }
    }).addCase(fetchBooks.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
    builder.addCase(addBook.pending, (state) => {
      state.status = 'loading';
    }).addCase(addBook.fulfilled, (state, action) => {
      if (action.payload !== null) {
        state.status = 'succeeded';
        state.error = '';
        state.books.push(action.payload);
      } else {
        state.status = 'failed';
        state.error = 'Unable to add record!';
      }
    }).addCase(addBook.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
    builder.addCase(removeBook.pending, (state) => {
      state.status = 'loading';
    }).addCase(removeBook.fulfilled, (state, action) => {
      if (action.payload !== null) {
        state.status = 'succeeded';
        state.error = '';
        state.books = state.books.filter((x) => x.item_id !== action.payload.item_id);
        if (state.books.length === 0) state.error = 'No result was found!';
      } else {
        state.status = 'failed';
        state.error = 'Unable to remove record!';
      }
    }).addCase(removeBook.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  },
});

// Action creators are generated for each case reducer function
export { addBook, fetchBooks, removeBook };

export default booksSlice.reducer;
