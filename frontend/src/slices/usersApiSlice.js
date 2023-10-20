import { apiSlice } from "./apiSlice";
import {USER_URL} from '../constants'


export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints : (builder) => ({
        login : builder.mutation({
            query : (data) => ({
                url : `${USER_URL}/auth` ,
                method : 'POST',
                body : data
            })
        }),
        register : builder.mutation({
            query : (data) => ({
                url : `${USER_URL}` ,
                method : 'POST',
                body : data
            })
        }),
        logout : builder.mutation({
            query : () => ({
                url : `${USER_URL}/logout` ,
                method : 'POST'
            })
        }),
        userProfile : builder.mutation({
            query : (data) => ({
                url : `${USER_URL}/profile`,
                method : 'PUT',
                body : data
            })
        }),
        getAllUsers : builder.query({
            query : () => ({
                url : USER_URL
            }),
            providesTags : ['User'],
            keepUnusedDataFor : 5
        }),
        deleteUser : builder.mutation({
            query : (id) => ({
                url : `${USER_URL}/${id}`,
                method : 'DELETE'
            }),
        
            
        }),
        updateUser : builder.mutation({
            query : (id) => ({
                url: `${USER_URL}/${id}`,
                method : 'PUT'
            })
        })
    })
    
})

export const {useUpdateUserMutation, useGetAllUsersQuery, useLoginMutation , useLogoutMutation ,useRegisterMutation ,useUserProfileMutation ,useDeleteUserMutation} = usersApiSlice