// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice';  // Adjust the path to where your apiSlice is located

export const store = configureStore({
  reducer: {
    // Automatically adds slice reducers to the store
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  // Automatically adds the RTK Query's 'fetchBaseQuery' middleware to enable caching, invalidation, polling, and other features of RTK Query
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  // Optional: add Redux DevTools support
  devTools: process.env.NODE_ENV !== 'production',
});

