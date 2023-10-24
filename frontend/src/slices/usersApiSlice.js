// Import the 'apiSlice' from your custom 'apiSlice' file
import { apiSlice } from "./apiSlice";
import { USER_URL } from "../constants"; // Import the URL constants

// Create and configure the 'usersApiSlice' using 'apiSlice.injectEndpoints'
export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Mutation for user login
    login: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
    // Mutation for user registration
    register: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    // Mutation for user logout
    logout: builder.mutation({
      query: () => ({
        url: `${USER_URL}/logout`,
        method: "POST",
      }),
    }),
    // Mutation for updating user profile
    userProfile: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
    // Query to get all users
    getAllUsers: builder.query({
      query: () => ({
        url: USER_URL,
      }),
      providesTags: ["User"], // Tag for caching
      keepUnusedDataFor: 5, // Cache retention duration
    }),
    // Mutation to delete a user
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `${USER_URL}/${id}`,
        method: "DELETE",
      }),
    }),
    // Mutation to update a user
    updateUser: builder.mutation({
      query: (id) => ({
        url: `${USER_URL}/${id}`,
        method: "PUT",
      }),
    }),
  }),
});

// Export the generated hooks for using the API endpoints
export const {
  useUpdateUserMutation,
  useGetAllUsersQuery,
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUserProfileMutation,
  useDeleteUserMutation,
} = usersApiSlice;
