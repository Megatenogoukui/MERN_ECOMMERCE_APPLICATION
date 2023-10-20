import {apiSlice} from './apiSlice.js'
import { ORDERS_URL, PAYPAL_URL } from '../constants.js'

export const orderApiSlice = apiSlice.injectEndpoints({
    endpoints : (builder) => ({
        createOrder : builder.mutation({
            query : (order) => ({
                url : ORDERS_URL,
                method : 'POST',
                body : {...order}

            })
        }),
        getOrderDetails : builder.query({
            query : (orderId) => ({
                url : `${ORDERS_URL}/${orderId}`
            }),
            keepUnusedDataFor : 5
        }),
        payOrder : builder.mutation({
            query : ({orderId , details}) => ({
                url : `${ORDERS_URL}/${orderId}/pay`,
                method : 'PUT',
                body : {...details}
            })
        }),
        getPaypalClientId: builder.query({
            query: () => ({
              url: PAYPAL_URL,
         }),
            keepUnusedDataFor: 5,
          }),
        getMyOrder : builder.query({
            query : () => ({
                url : `${ORDERS_URL}/myOrders`
            }),
            keepUnusedDataFor:5
        }),
        getAllOrders : builder.query({
            query : () => ({
                url : ORDERS_URL
            }),
            keepUnusedDataFor : 5
        }),
        orderDelivered : builder.mutation({
            query : (orderId) => ({
                url : `${ORDERS_URL}/${orderId}/deliver`,
                method : 'PUT'

            })
        })
    })
})

export const {useCreateOrderMutation, useGetOrderDetailsQuery ,useGetPaypalClientIdQuery ,usePayOrderMutation , useGetMyOrderQuery ,useGetAllOrdersQuery, useOrderDeliveredMutation} = orderApiSlice