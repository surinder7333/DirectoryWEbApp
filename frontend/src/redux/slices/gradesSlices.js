import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// const API_URL = 'http://localhost:8080/api/grades';
const API_URL = 'https://directorywebapp.onrender.com/api/grades';

export const fetchGrades = createAsyncThunk(
  'grades/fetchGrades',
  async () => {
    const response = await axios.get(API_URL);
    return response.data;
  }
);


export const addGrade = createAsyncThunk(
  'grades/addGrade',
  async (productData) => {
    const response = await axios.post(API_URL, productData);
    return response.data;
  }
);


const gradesSlice = createSlice({
  name: 'grades',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGrades.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchGrades.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchGrades.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default gradesSlice.reducer;