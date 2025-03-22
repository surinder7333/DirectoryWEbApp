import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../redux/slices/productSlice';
import materialsReducer from '../redux/slices/materialSlice';
import gradesReducer from '../redux/slices/gradesSlices';
import productCombinationsReducer from '../redux/slices/productCombinationSlice';
import filtersReducer from '../redux/slices/filterSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    materials: materialsReducer,
    grades: gradesReducer,
    productCombinations: productCombinationsReducer,
    filters: filtersReducer,
  },
});