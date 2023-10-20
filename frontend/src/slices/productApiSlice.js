import { apiSlice } from "./apiSlice.js";
import { PRODUCT_URL, UPLOAD_URL } from "../constants.js";


export const productApiSlice = apiSlice.injectEndpoints({
    endpoints : (builder) => ({
        getProducts : builder.query({
            query : ({keyword ,pageNumber}) => ({
                url : PRODUCT_URL,
                params : {
                    keyword,
                    pageNumber
                    
                }
            }),
            providesTags : ['Products'],
        keepUnusedDataFor : 5
        }),
        getProductsDetails : builder.query({
            query : (productId) => ({
                url : `${PRODUCT_URL}/${productId}`
            }),
        keepUnusedDataFor : 5
        }),
        createProduct : builder.mutation({
            query : () => ({
                url : PRODUCT_URL,
                method : 'POST'
            }),
            invalidatesTags : ['Products']
        }),
        updateProduct : builder.mutation({
            query : (data) => ({
                url : `${PRODUCT_URL}/${data._id}`,
                method : 'POST',
                body : data
            }),
            invalidatesTags : ['Products']
        }),
        uploadImage :builder.mutation({
            query : (data) => ({
                url : UPLOAD_URL,
                method : 'POST',
                body: data
            })
        }),
        deleteProduct : builder.mutation({
            query : (id) => ({
                url : `${PRODUCT_URL}/${id}`,
                method : 'DELETE',
               
            })
        }),
        createProductReview : builder.mutation({
            query : (data) => ({
                url :  `${PRODUCT_URL}/${data.productId}/reviews`,
                method : 'POST',
                body : data
            }),
            invalidatesTags : ['Product']
        }),
        topProduct : builder.query({
            query : () => ({
                url : `${PRODUCT_URL}/top`
            }),
            keepUnusedDataFor : 5
        })
    })
})

export const {useTopProductQuery,useCreateProductReviewMutation,useGetProductsQuery , useGetProductsDetailsQuery ,useCreateProductMutation,useUpdateProductMutation ,useUploadImageMutation ,useDeleteProductMutation} = productApiSlice