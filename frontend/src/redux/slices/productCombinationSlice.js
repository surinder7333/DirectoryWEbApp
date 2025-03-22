import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:8080/api/product-combinations";

export const fetchProductCombinations = createAsyncThunk(
  "productCombinations/fetchProductCombinations",
  async (params = {}, { rejectWithValue }) => {
    try {
      // Build query parameters for filtering, searching, and sorting
      const queryParams = new URLSearchParams();

      if (params.productId) queryParams.append("productId", params.productId);
      if (params.materialId)
        queryParams.append("materialId", params.materialId);
      if (params.searchText)
        queryParams.append("searchText", params.searchText);
      if (params.sortField) queryParams.append("sortField", params.sortField);
      if (params.sortDirection)
        queryParams.append("sortDirection", params.sortDirection);

      const response = await axios.get(`${API_URL}?${queryParams.toString()}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

export const addProductCombination = createAsyncThunk(
  "productCombinations/addProductCombination",
  async (combinationData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, combinationData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

export const updateProductCombination = createAsyncThunk(
  "productCombinations/updateProductCombination",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${API_URL}/${id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

export const bulkUpdateProductCombinations = createAsyncThunk(
  "productCombinations/bulkUpdateProductCombinations",
  async ({ ids, updates }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${API_URL}/bulk-update`, {
        ids,
        updates,
      });
      return {
        ids,
        updates,
        updatedCombinations: response.data.updatedCombinations,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

const productCombinationSlice = createSlice({
  name: "productCombinations",
  initialState: {
    items: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    selectedItems: [],
  },
  reducers: {
    toggleSelectItem: (state, action) => {
      const id = action.payload;
      if (state.selectedItems.includes(id)) {
        state.selectedItems = state.selectedItems.filter(
          (itemId) => itemId !== id
        );
      } else {
        state.selectedItems.push(id);
      }
    },
    selectAllItems: (state) => {
      if (state.selectedItems.length === state.items.length) {
        state.selectedItems = [];
      } else {
        state.selectedItems = state.items.map((item) => item._id);
      }
    },
    clearSelectedItems: (state) => {
      state.selectedItems = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductCombinations.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductCombinations.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProductCombinations.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || action.error.message;
      })
      .addCase(addProductCombination.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateProductCombination.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item._id === action.payload._id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(bulkUpdateProductCombinations.fulfilled, (state, action) => {
        if (action.payload.updatedCombinations) {
          // Replace the updated items in the state
          const updatedIds = action.payload.updatedCombinations.map(
            (item) => item._id
          );
          state.items = state.items
            .filter((item) => !updatedIds.includes(item._id))
            .concat(action.payload.updatedCombinations);
        } else {
          // Fallback to the old behavior if updatedCombinations is not available
          const { ids, updates } = action.payload;
          state.items = state.items.map((item) => {
            if (ids.includes(item._id)) {
              return { ...item, ...updates, hasDetails: true };
            }
            return item;
          });
        }
      });
  },
});

export const { toggleSelectItem, selectAllItems, clearSelectedItems } =
  productCombinationSlice.actions;

export default productCombinationSlice.reducer;
