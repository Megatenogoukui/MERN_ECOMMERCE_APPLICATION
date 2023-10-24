import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants';

// Configure the base query function with the base URL
const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

// Create an API slice using Redux Toolkit Query
export const apiSlice = createApi({
  baseQuery, // Set the base query function

  // Define tag types for caching (e.g., 'Product', 'User', 'Order')
  tagTypes: ['Product', 'User', 'Order'],

  endpoints: (builder) => ({
    // Will inject the endPoints here
    // Endpoints are functions that will be generated to interact with your API
  }),
});