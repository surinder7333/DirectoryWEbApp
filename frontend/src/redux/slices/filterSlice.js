// import { createSlice } from '@reduxjs/toolkit';

// const filtersSlice = createSlice({
//   name: 'filters',
//   initialState: {
//     searchText: '',
//     selectedProduct: '',
//     selectedMaterial: '',
//   },
//   reducers: {
//     setSearchText: (state, action) => {
//       state.searchText = action.payload;
//     },
//     setSelectedProduct: (state, action) => {
//       state.selectedProduct = action.payload;
//     },
//     setSelectedMaterial: (state, action) => {
//       state.selectedMaterial = action.payload;
//     },
//     clearFilters: (state) => {
//       state.searchText = '';
//       state.selectedProduct = '';
//       state.selectedMaterial = '';
//     }
//   }
// });

// export const {
//   setSearchText,
//   setSelectedProduct,
//   setSelectedMaterial,
//   clearFilters
// } = filtersSlice.actions;

// export default filtersSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchText: "",
  selectedProduct: "",
  selectedMaterial: "",
  sortField: "title",
  sortDirection: "asc",
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    setSelectedMaterial: (state, action) => {
      state.selectedMaterial = action.payload;
    },
    setSortConfig: (state, action) => {
      state.sortField = action.payload.key;
      state.sortDirection = action.payload.direction;
    },
    clearFilters: (state) => {
      state.searchText = "";
      state.selectedProduct = "";
      state.selectedMaterial = "";
    },
  },
});

export const {
  setSearchText,
  setSelectedProduct,
  setSelectedMaterial,
  setSortConfig,
  clearFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
