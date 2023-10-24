// Import the createSlice function from Redux Toolkit
import { createSlice } from "@reduxjs/toolkit";

// Define the initial state for the auth slice, using local storage if available
const initialState = {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
}

// Create an authSlice using createSlice
const authSlice = createSlice({
    name: 'auth',  // Name of the slice
    initialState,  // Initial state
    reducers: {
        // Reducer for setting user credentials
        setCredentials: (state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem('userInfo', JSON.stringify(action.payload));
        },
        // Reducer for logging out the user
        logout: (state, action) => {
            state.userInfo = null;
            localStorage.removeItem('userInfo');
        }
    }
})

// Export the action creators (setCredentials and logout) and the reducer
export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;