import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// const API_URL = 'http://localhost:8080/api/materials';
const API_URL = 'https://directorywebapp.onrender.com/api/materials';

export const fetchMaterials = createAsyncThunk(
  'materials/fetchMaterials',
  async () => {
    const response = await axios.get(API_URL);
    return response.data;
  }
);

export const addMaterial = createAsyncThunk(
  'materials/addMaterial',
  async (productData) => {
    const response = await axios.post(API_URL, productData);
    return response.data;
  }
);


const materialsSlice = createSlice({
  name: 'materials',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMaterials.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMaterials.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchMaterials.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default materialsSlice.reducer;